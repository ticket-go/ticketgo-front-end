import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/actions/create-user";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },

    async signIn({ user, account, profile }) {
      const { email, name } = user;

      const username = profile?.email?.split("@")[0];
      const first_name = name?.split(" ")[0];
      const last_name = name?.split(" ").slice(1).join(" ");

      await createUser({ username, email, first_name, last_name });
      return true;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
