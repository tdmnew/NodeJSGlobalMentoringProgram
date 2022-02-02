import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      login: "tim",
      password: "test123",
      age: 30,
      isDeleted: false,
    },
    {
      login: "dmitry",
      password: "test1234",
      age: 20,
      isDeleted: false,
    },
  ]);
}
