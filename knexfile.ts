import { Knex } from 'knex';
import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
    throw new Error('Couldn\'t find .env file');
}

const config: Knex.Config = {
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URI,
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'migrations'
    }
};

export default config;
