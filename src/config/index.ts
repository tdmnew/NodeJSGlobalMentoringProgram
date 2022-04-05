import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
    throw new Error("Couldn't find .env file");
}

export const ENV_VARIABLES = {
    JWT_SECRET: process.env.JWT_SECRET,
    SERVER_PORT: process.env.SERVER_PORT,
    DB_URI: process.env.DB_URI ?? '',
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT
};

export const SQL = {
    connectionString: ENV_VARIABLES.DB_URI,
    user: ENV_VARIABLES.DB_USER,
    pass: ENV_VARIABLES.DB_PASS,
    ssl: {
        rejectUnauthorized: false
    }
};
