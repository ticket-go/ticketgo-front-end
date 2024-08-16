"use server";

import { pool } from "@/lib/postgres";

export async function clearStaleTokens() {
  try {
    await pool.query("DELETE FROM verification_token WHERE expires < NOW();");
  } catch (error) {
    throw error;
  }
}
