import { Sequelize } from "sequelize";

const { DB_URI } = process.env;

const sequelizeLoader = async () => {
  const sequelize = new Sequelize(DB_URI ?? "", {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }


  console.log('Sequelize Loaded')
};

export default sequelizeLoader;
