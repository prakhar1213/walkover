const { validationResult } = require("express-validator/check");
const User = require("../models/User");
const { v1: uuidv1 } = require("uuid");

exports.getUsers = (req, res, next) => {
  User.findAll()
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

// exports.addUser = (req, res, next) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const access_token = uuidv1();
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             status: "fail",
//             hasError: true,
//             errors: errors.array()
//         })
//     }
//     User.create({
//         name: name,
//         email: email,
//         access_token: access_token
//     }).then(users => {
//         res.status(201).json({
//             status: 'success',
//             data: users,
//             hasError: false,
//             errors: {},
//             message: 'User Created Successfully.'
//         })
//     }).catch(err => {
//         res.status(500).json({
//             status: 'fail',
//             data: {},
//             hasError: true,
//             errors: err
//         });
//     });

// }

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.status(200).json({
        status: "success",
        data: user,
        hasError: false,
        errors: {},
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        data: {},
        hasError: true,
        errors: err,
      });
    });
};
