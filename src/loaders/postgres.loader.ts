import { Client } from 'pg';
import { SQL } from '../config/index';

const postgressLoader = async () => {
    try {
    // Initialise client
        const client = new Client(SQL.CONFIG);
        const connection = await client.connect();

        console.log('Postgres DB Loaded');

        return connection;
    } catch (e) {
        console.error(e);
    }
};

export default postgressLoader;
