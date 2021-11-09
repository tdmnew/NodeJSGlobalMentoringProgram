import { ENV_VARIABLES } from "./index";

export const CONFIG = {
  connectionString: ENV_VARIABLES.DB_URI,
  user: ENV_VARIABLES.DB_USER,
  pass: ENV_VARIABLES.DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const QUERIES = {
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid primary key DEFAULT gen_random_uuid(),
      "login" varchar, 
      "password" varchar, 
      "age" int, 
      "isDeleted" boolean DEFAULT false,
      "createdAt" timestamp with time zone default current_timestamp,
      "updatedAt" timestamp with time zone default current_timestamp
    );`,
  CHECK_EXISTS: `SELECT * FROM users WHERE login=$1 OR login=$2`,
  CREATE_USER: `INSERT INTO users(login, password, age) VALUES($1, $2, $3);`,
};

export const USERS = {
  USER_1: ["Tim", "Test123", 30],
  USER_2: ["Dmitry", "Test123", 22],
};
