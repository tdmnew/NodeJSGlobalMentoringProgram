import { Sequelize } from 'sequelize';
import { ENV_VARIABLES } from '../config';

const sequelizeLoader = async () => {
    const sequelize = new Sequelize(ENV_VARIABLES.DB_URI, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    try {
        await sequelize.authenticate();
        console.log('Sequelize Loaded');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};

export default sequelizeLoader;
