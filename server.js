const express = require("express");
const bodyParser = require("body-parser");

//routes
const UserRoutes = require("./src/backend/routes/user");

const sequelize = require("./src/backend/util/database");

//models
const User = require("./src/backend/models/User");

//initialise app
const app = express();

//body parser
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  next();
});

//routing
app.use("/api", UserRoutes);
sequelize
  .sync()
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {});
