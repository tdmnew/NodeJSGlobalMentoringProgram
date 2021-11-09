import { Client } from "pg";
import { SQL } from "../config/index";

const postgressLoader = async () => {
  try {
    // Initialise client
    const client = new Client(SQL.CONFIG);
    const connection = await client.connect();

    // Populate table and users
    await client.query(SQL.QUERIES.CREATE_TABLE);

    // Create test users if they do not already exist
    const query1 = await client.query(SQL.QUERIES.CHECK_EXISTS, [
      ...SQL.USERS.USER_1.slice(0, 1),
      ...SQL.USERS.USER_2.slice(0, 1),
    ]);

    if (query1.rowCount !== 2) {
      await client.query(SQL.QUERIES.CREATE_USER, SQL.USERS.USER_1);
      await client.query(SQL.QUERIES.CREATE_USER, SQL.USERS.USER_2);
    }

    console.log("Postgres DB Loaded");

    return connection;
  } catch (e) {
    console.error(e);
  }
};

export default postgressLoader;
