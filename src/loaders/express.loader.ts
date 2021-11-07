import express, { json } from "express";

import routes from "../routes";

const expressLoader = ({ app }: { app: express.Application }) => {
  try {
    app = express();
    app.use(json());
    app.use(routes());
  } catch (e) {
    console.error(e);
  }

  console.log("Express Loaded");
};

export default expressLoader;
