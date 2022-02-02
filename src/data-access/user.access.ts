import { Op } from "sequelize";

import User from "../types/user.type";
import { Group } from "../models";

export const userLogin = (
  login: User["login"],
  password: User["password"]
) => ({
  where: { login, password },
});

export const findUser = (id: User["id"]) => ({
  include: [
    {
      model: Group,
      as: "groups",
    },
  ],
  where: { id, isDeleted: false },
});

export const autoSuggestions = (loginSubstring?: string, limit?: number) => ({
  limit,
  include: [
    {
      model: Group,
      as: "groups",
    },
  ],
  where: {
    login: {
      [Op.substring]: loginSubstring,
    },
    isDeleted: false,
  },
});
