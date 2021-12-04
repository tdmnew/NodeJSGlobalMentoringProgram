import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      login: "Tim",
      password: "Test123",
      age: 30,
    },
    {
      login: "Dmitry",
      password: "Test1234",
      age: 20,
    },
  ]);
}
