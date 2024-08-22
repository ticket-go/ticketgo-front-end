"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function putUser(
  userId: string,
  data: User
): Promise<User | void | undefined> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(`${process.env.API_HOST}/users/${userId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
