import { Router } from "express";

import userRoute from "./users.route";
import loginRoute from "./login.route";
import groupRoute from "./groups.route";

const routes = () => {
  const app = Router();

  const paths = [
    {
      path: "/users",
      route: userRoute,
    },
    {
      path: "/groups",
      route: groupRoute,
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
