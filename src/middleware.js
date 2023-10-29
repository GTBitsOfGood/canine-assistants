import withAuth from "next-auth/middleware";

export default withAuth({
  // Use JWTs for everything session-related
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    // newUser: "/dogs",
    // error: "/login",
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
});
