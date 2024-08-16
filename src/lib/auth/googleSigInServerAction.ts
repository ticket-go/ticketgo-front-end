import { signIn } from "next-auth/react";

export async function handleGoogleSignIn() {
  try {
    // Initiates the sign-in process with Google
    await signIn("google", {
      callbackUrl: "http://localhost:3000", // Redirect URL after successful sign-in
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error; // Rethrow the error to handle it in the calling context
  }
}
