const Sequelize = require("sequelize");

const sequelize = new Sequelize("walkover", "admin", "manthanmkt", {
  dialect: "mysql",
  host: "database-1.cf3cgl8hnnyn.ap-south-1.rds.amazonaws.com",
});

module.exports = sequelize;
