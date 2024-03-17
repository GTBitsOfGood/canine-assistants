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
import {
  verifyUser,
  signup,
  updateUser,
  getUserById,
  getUsers,
} from "../../../../server/db/actions/User";
import InvitedUser from "../../../../server/db/models/InvitedUser";
import {
  getInvitedUserByEmail,
  updateInvitedUser,
} from "../../../../server/db/actions/InvitedUser";

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
          return response.user;
        } else {
          throw new Error(response.message);
        }
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Signup with Email and Password",

      async authorize(credentials) {
        const response = await signup(
          credentials.email,
          credentials.password,
          credentials.name,
        );

        if (response.status === 200) {
          return response.user;
        } else {
          throw new Error(response.message);
        }
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
    // newUser: "/signup",
    // error: "/login",
  },
  events: {
    createUser: async (message) => {
      await dbConnect();
      const invitedUser = await getInvitedUserByEmail(message.user.email);

      if (!invitedUser || !invitedUser.isActive) {
        await User.deleteOne({ email: message.user.email });
      }

      const updateObject = {
        role: invitedUser.role,
        acceptedInvite: true,
        isActive: true,
      };
      await updateUser(message.user.id, updateObject);
      await updateInvitedUser(invitedUser._id, updateObject);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Only fail if the user exists but is not active
      // If the user doesn't exist, we should return true so that they are created
      const dbUser = (await getUsers({ email: user.email }))[0];
      return !(dbUser && !dbUser.isActive);
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
      }
      // else {
      //   const user = await User.findById(token.sub);
      //   token.name = user.name;
      //   token.role = user.role;
      // }
      if (trigger === "update") {
        await dbConnect();
        const user = await User.findById(token.sub);
        token.name = user.name;
        token.role = user.role;
        token.isActive = user.isActive;
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
