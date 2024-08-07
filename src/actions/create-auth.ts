"use server";

import { User } from "@/types/user";

export async function createAuth(): Promise<User | void>{
     try {
      const response = await fetch(${process.env.API_HOST}/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      alert("User registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user");
    }
};  