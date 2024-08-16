"use server";

import { User } from "@/types/user";

export async function createUser(data: User): Promise<User | void> {
  try {
    const response = await fetch(`${process.env.API_HOST}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
}
