const { json } = require("body-parser");
const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./User");

const UserTable = sequelize.define("usertable", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  userId: {
    type: Sequelize.STRING,
    reference: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  tableName: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = UserTable;
