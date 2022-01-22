import { Sequelize, DataTypes } from "sequelize";

const User = (sequelize: Sequelize) =>
  sequelize.define("usergroups", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
    },
  });

export default User;
