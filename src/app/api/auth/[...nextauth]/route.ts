import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authConfig";

// Export a named `GET` method
export const GET = NextAuth(authOptions);

// Export a named `POST` method
export const POST = NextAuth(authOptions);
