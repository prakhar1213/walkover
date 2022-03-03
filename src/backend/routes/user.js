const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controllers/UserController");
const TableController = require("../controllers/TableController");
// const auth = require('../middleware/auth');

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/users/:userId", UserController.getUser);
router.post("/tables", TableController.createTable);
router.get("/tables", TableController.getTables);
router.get("/table/:id", TableController.getTable);
router.post("/insert-data", TableController.insertData);
router.get("/show-data", TableController.showData);
module.exports = router;
