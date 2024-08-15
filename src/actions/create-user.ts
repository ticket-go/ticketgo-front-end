"use server";

import { User } from "@/types/user";

export async function createUser(data: User): Promise<User | void> {
  const response = await fetch(`${process.env.API_HOST}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });

  if (response.ok) {
    const userData = await response.json();
    return userData as User;
  } else {
    console.error(
      "Failed to create user:",
      response.status,
      response.statusText
    );
  }
}
