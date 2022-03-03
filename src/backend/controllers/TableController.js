const { validationResult } = require("express-validator/check");
const { v1: uuidv1 } = require("uuid");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const UserTable = require("../models/UserTable");
const _ = require("lodash");

exports.getTables = async (req, res, next) => {
  UserTable.findAll()
    .then((users) => {
      res.status(200).json({
        status: "success",
        data: users,
        hasError: false,
        errors: {},
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        data: {},
        hasError: true,
        errors: err,
      });
    });
};

exports.createTable = async (req, res, next) => {
  const tableName = req.body.tableName;
  const columns = req.body.columns;
  const uId = req.body.userId;
  let sql = "create table ";
  if (!tableName || !columns) {
    return res.status(422).json({
      status: "fail",
      hasError: true,
    });
  }
  sql += tableName + " (";
  const size = columns.length - 1;
  console.log(size);
  columns.forEach((element, index) => {
    console.log(index);
    sql += `${element.cname} ${element.type} ${
      element.pk === true ? "PRIMARY KEY" : ""
    }`;
    sql += size === index ? ")" : ",";
  });
  let records = null;
  try {
    records = await sequelize.query(sql, {
      type: QueryTypes.Insert,
    });
  } catch (e) {
    res.status(409).json({
      status: "fail",
      data: {},
      hasError: true,
      errors: e.message,
    });
  }

  if (records) {
    UserTable.create({
      tableName: tableName,
      userId: uId,
    })
      .then((userTable) => {
        res.status(201).json({
          status: "success",
          data: userTable,
          hasError: false,
          errors: {},
          message: "Table created successfully",
        });
      })
      .catch((err) => {
        res.send({
          status: "fail",
          data: {},
          hasError: true,
          errors: err,
        });
      });
  }
};

exports.getTable = async (req, res, next) => {
  const tableName = req.params.userId;
  const records = await sequelize.query(
    "SELECT  FROM information_schema.tables;",
    {
      type: QueryTypes.SELECT,
    }
  );
  if (records) {
    res.status(201).json({
      status: "success",
      data: records,
      hasError: false,
      errors: {},
    });
  } else {
    res.send({
      status: "fail",
      data: {},
      hasError: true,
      errors: err,
    });
  }
};

exports.insertData = async (req, res, next) => {
  const tableName = req.body.tableName;
  const values = req.body.values;

  fields = [];
  v = [];
  values.forEach((element) => {
    fields.push(element.cname);
    if (typeof element.value == "string") {
      temp = '"' + element.value + '"';
    } else {
      temp = element.value;
    }

    v.push(temp);
  });
  fields = fields.join();
  v = v.join();
  const records = await sequelize.query(
    `insert into ${tableName} (${fields}) VALUES (${v})`,
    {
      type: QueryTypes.INSERT,
    }
  );
  if (records) {
    res.status(201).json({
      status: "success",
      data: {},
      hasError: false,
      errors: {},
      message: "Data inserted successfully",
    });
  } else {
    res.send({
      status: "fail",
      data: {},
      hasError: true,
      errors: err,
    });
  }
};

exports.showData = async (req, res, next) => {
  const tableName = _.pick(req.query, "tableName");
  const records = await sequelize.query(
    `select * from ${tableName.tableName}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (records) {
    res.status(201).json({
      status: "success",
      data: records,
      hasError: false,
      errors: {},
      message: "Data inserted successfully",
    });
  } else {
    res.send({
      status: "fail",
      data: {},
      hasError: true,
      errors: err,
    });
  }
};
