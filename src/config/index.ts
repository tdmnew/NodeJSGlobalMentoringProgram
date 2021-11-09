import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const env = dotenv.config();

if (env.error) {
  throw new Error(`Couldn't find .env file`);
}

export const ENV_VARIABLES = {
  SERVER_PORT: process.env.SERVER_PORT,

  DB_URI: process.env.DB_URI ?? '',
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
};

export * as SQL from './sql.config';
export { SEQUELIZE_CONFIG } from './sequelize.config';
