import { Application } from "express";

import postgresLoader from "./postgres.loader";
import sequelizeLoader from "./sequelize.loader";
import expressLoader from "./express.loader";

const loader = async ({ expressApp }: { expressApp: Application }) => {
  await postgresLoader();
  await sequelizeLoader();
  expressLoader({ app: expressApp });
};

export default loader;
