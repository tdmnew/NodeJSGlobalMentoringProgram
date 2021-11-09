import { Op } from "sequelize";

import User from "../types/user.type";

export const userLogin = (
  login: User["login"],
  password: User["password"]
) => ({
  where: { login: login, password: password },
});

export const findUser = (userId: User["id"]) => ({
  where: { id: userId, isDeleted: false },
});

export const autoSuggestions = (loginSubstring?: string, limit?: number) => ({
  limit,
  where: {
    login: {
      [Op.substring]: loginSubstring,
    },
    isDeleted: false,
  },
});
