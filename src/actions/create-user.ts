"use server";

import { User } from "@/types/user";

export async function createUser(data: any): Promise<User | void> {
  const response = await fetch(`${process.env.API_HOST}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: data.user_id || "",
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      gender: data.gender,
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
