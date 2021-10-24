import { Router } from "express";

import { validateLogin } from "../validations";
import { loginController } from "../controllers";

const router = Router();

router
  .route("/")
  .get(validateLogin, loginController.login);

export default router;

