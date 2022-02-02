import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('login');
        table.string('password');
        table.integer('age');
        table.boolean('isDeleted');
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
