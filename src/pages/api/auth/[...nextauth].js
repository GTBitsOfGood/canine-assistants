import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import dbConnect, { DB_INFO } from "../../../../server/db/dbConnect";
import GoogleProvider from "next-auth/providers/google";

let cachedPromise;

import { MongoClient } from "mongodb";

const client = new MongoClient(DB_INFO.DB_CONNECTION_STRING);

const retrievePromise = () => {
  if (cachedPromise) {
    return cachedPromise;
  } else {
    cachedPromise = client.connect();
    return cachedPromise;
  }
};

/**
 * @type {import("next-auth").NextAuthOptions}
 */
export const authOptions = {
  adapter: MongoDBAdapter(retrievePromise()),

  // Use JWTs for everything session-related
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/dogs",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };

        return token;
      }
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    }
  },
};

export default NextAuth(authOptions);
