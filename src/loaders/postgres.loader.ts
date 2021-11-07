import { Client } from "pg";

const { DB_URI, DB_USER, DB_PASS, DB_HOST } = process.env;

const createTable = `
CREATE TABLE IF NOT EXISTS "users" (
  "id" serial,
  "login" varchar, 
  "password" varchar, 
  "age" int, 
  "isDeleted" boolean DEFAULT false,
  PRIMARY KEY ("id")
);
`;

const createUser = `INSERT INTO users(login, password, age) VALUES($1, $2, $3);`;
const checkExists = `SELECT * FROM users where login=$1`;

const user1 = ["Tim", "Test123", 30];
const user2 = ["Dmitry", "Test123", 22];

const config = {
  connectionString: DB_URI,
  user: DB_USER,
  pass: DB_PASS,
  host: DB_HOST,
  ssl: {
    rejectUnauthorized: false,
  },
};

const postgressLoader = async () => {
  try {
    // Initialise client
    const client = new Client(config);
    const connection = await client.connect();

    // Populate table and users
    await client.query(createTable);

    const query1 = await client.query(checkExists, user1.slice(0, 1));
    if (query1.rowCount !== 1) {
      await client.query(createUser, user1);
    }

    const query2 = await client.query(checkExists, user2.slice(0, 1));
    if (query2.rowCount !== 1) {
      await client.query(createUser, user2);
    }

    console.log("Postgres DB Loaded");

    return connection;
  } catch (e) {
    console.error(e);
  }
};

export default postgressLoader;
