import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import dbConnect, {
  DB_CONNECTION_STRING,
} from "../../../../server/db/dbConnect";
import GoogleProvider from "next-auth/providers/google";

let cachedPromise;

import { MongoClient, ObjectId } from "mongodb";
import User from "../../../../server/db/models/User";

const client = new MongoClient(DB_CONNECTION_STRING);

const retrievePromise = () => {
  if (cachedPromise) {
    return cachedPromise;
  } else {
    cachedPromise = client.connect();
    return cachedPromise;
  }
};

console.log(`CURRENT NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);

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
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    // newUser: "/dogs",
    // error: "/login",
  },
  events: {
    createUser: async (message) => {
      await dbConnect();

      const _id = new ObjectId(message.user.id);

      // TODO: Find a way of avoiding unnecessary deletion calls
      await User.deleteOne({ _id });

      const newUserRecord = {
        _id,
        name: message.user.name,
        email: message.user.email,
        image: message.user.image,
        role: "Volunteer/Recipient", // TODO: Default string shouldn't be hardcoded and instead moved somewhere else
      };

      const user = new User(newUserRecord);

      await user.save();
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.role) {
        user.role = "Volunteer";
      }

      return true;
    },
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
        session.role = token.role;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
