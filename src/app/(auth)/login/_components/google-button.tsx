"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "http://localhost:3000/" });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={"outline"}
      disabled={isLoading}
      onClick={handleSignIn}
      className="border-[0.5] h-14"
    >
      Entrar com Google
    </Button>
  );
}
