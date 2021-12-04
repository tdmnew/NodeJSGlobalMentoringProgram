import express from "express";

import loaders from "./loaders";
import { ENV_VARIABLES } from "./config";

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(ENV_VARIABLES.SERVER_PORT, () => {
      console.log(`Server running on port ${ENV_VARIABLES.SERVER_PORT}`);
    })
    .on("error", (err) => {
      console.error(err);
    });
};

startServer();
