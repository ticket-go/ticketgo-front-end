import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { pool } from "@/lib/postgres";
import PostgresAdapter from "@auth/pg-adapter";
import { Adapter } from "next-auth/adapters";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  // adapter: PostgresAdapter(pool) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { user } = session;

      if (user) {
        session.user = {
          ...session.user,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
