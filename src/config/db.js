import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  : new Pool({
      host: process.env.PGHOST  "127.0.0.1",
      port: Number(process.env.PGPORT  5432),
      database: process.env.PGDATABASE  "movies_db",
      user: process.env.PGUSER  "postgres",
      password: process.env.PGPASSWORD || "",
    });

// export a query helper
export const q = (text, params) => pool.query(text, params);