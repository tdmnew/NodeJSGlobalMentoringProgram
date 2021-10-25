import { Router } from "express";

import { validateLogin } from "../validations";
import { loginController } from "../controllers";

const router = Router();

router
  .route("/")
  .post(validateLogin, loginController.login);

export default router;

