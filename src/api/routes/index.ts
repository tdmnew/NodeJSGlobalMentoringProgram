import { Router } from "express";

import userRoute from "./users.route";
import loginRoute from "./login.route";

const routes = () => {
  const app = Router();

  const paths = [
    {
      path: "/users",
      route: userRoute,
    },
    {
      path: "/login",
      route: loginRoute,
    },
  ];

  paths.forEach((route) => {
    app.use(route.path, route.route);
  });

  return app;
};

export default routes;
