import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres::memory:");

const User = sequelize.define("User", {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default User;
