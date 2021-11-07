import dotenv from "dotenv";
import express from "express";

dotenv.config();

import loaders from "./loaders";

const PORT = 3000;

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.error(err);
    });
};

startServer();
