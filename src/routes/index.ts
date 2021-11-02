import { Router } from "express";

import userRoute from "./users.route";
import loginRoute from "./login.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/login",
    route: loginRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
