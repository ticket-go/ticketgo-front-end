import { Pool } from "pg";

const port = parseInt(process.env.AUTH_DATABASE_PORT || "5432", 10);

export const pool = new Pool({
  host: process.env.AUTH_DATABASE_HOST,
  port: port,
  database: process.env.AUTH_DATABASE_NAME,
  user: process.env.AUTH_DATABASE_USER,
  password: process.env.AUTH_DATABASE_PASSWORD,
});
