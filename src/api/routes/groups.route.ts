import { Router } from "express";

import {
  validateCreateGroup,
  validateUpdateGroup,
  validateAddUsersToGroup,
  validateQuery,
  validateParams,
} from "../../validations";
import { groupController } from "../controllers";

const router = Router();

router
  .route("/")
  .get(validateQuery, groupController.getGroups)
  .post(validateCreateGroup, groupController.createGroup);

router
  .route("/add-users-to-group")
  .post(validateAddUsersToGroup, groupController.addUsersToGroup);

router
  .route("/:id")
  .get(validateParams, groupController.getGroup)
  .put(validateUpdateGroup, groupController.updateGroup)
  .delete(validateParams, groupController.deleteGroup);

export default router;
