import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },

    async signIn(params) {
      const { account, user } = params;

      if (account?.provider === "google" && user.email) {
      }
      return true;
    },

    async singOut(params) {
      return true;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
