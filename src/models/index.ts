import { Sequelize } from "sequelize";

import { ENV_VARIABLES } from "../config";

import UserModel from "./user.model";
import GroupModel from "./group.model";
import UserGroupModel from "./usergroup.model";

const sequelize = new Sequelize(ENV_VARIABLES.DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const User = UserModel(sequelize);
const Group = GroupModel(sequelize);
const UserGroup = UserGroupModel(sequelize);

User.belongsToMany(Group, {
  through: "usergroups",
  as: "groups",
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true,
});

Group.belongsToMany(User, {
  through: "usergroups",
  as: "users",
  foreignKey: "groupId",
  onDelete: "cascade",
  hooks: true,
});

sequelize.sync();

export { User, Group, UserGroup, sequelize };
