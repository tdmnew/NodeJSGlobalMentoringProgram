import { ENV_VARIABLES } from "./index";

export const CONFIG = {
  connectionString: ENV_VARIABLES.DB_URI,
  user: ENV_VARIABLES.DB_USER,
  pass: ENV_VARIABLES.DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
};
