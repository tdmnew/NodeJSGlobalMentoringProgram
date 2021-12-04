import { Router } from "express";

import {
  validateCreateUser,
  validateUpdateUser,
  validateQuery,
  validateParams,
} from "../../validations";
import { userController } from "../controllers";

const router = Router();

router
  .route("/")
  .get(validateQuery, userController.getUsers)
  .post(validateCreateUser, userController.createUser);

router
  .route("/:id")
  .get(validateParams, userController.getUser)
  .put(validateUpdateUser, userController.updateUser)
  .delete(validateParams, userController.deleteUser);

export default router;
