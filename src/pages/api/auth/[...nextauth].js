import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import dbConnect, {
  DB_CONNECTION_STRING,
} from "../../../../server/db/dbConnect";
import GoogleProvider from "next-auth/providers/google";

let cachedPromise;

import { MongoClient, ObjectId } from "mongodb";
import User from "../../../../server/db/models/User";

import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../../../../server/db/actions/User";

const client = new MongoClient(DB_CONNECTION_STRING);

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
    CredentialsProvider({
      id: "credentials",
      name: "Login with Username and Password",

      async authorize(credentials) {
        const response = await verifyUser(
          credentials.email,
          credentials.password,
        );

        if (response.status === 200) {
          return {
            id: response.message._id,
            ...response.message,
          };
        } else {
          console.log({ response, credentials });

          return null;
        }
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
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
      if (!user._doc.role) {
        user.role = "Volunteer/Recipient";
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user._doc.role;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user.role = token.role;
        session.user._id = token.sub;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
