// var JWT = require('jwt-simple');
// const User = require('../models/User');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         User.findOne({
//             where: {
//                 'access_token': token
//             }
//         }).then(user => {
//             if(!user) {
//                 return res.status(403).json({
//                     status: 'fail',
//                     data: {},
//                     hasError: true,
//                     errors: ["Authorization Failed."]
//                 });
//             }
//             req.body.user = user;
//             next();
//         }).catch(err => {
//             return res.status(403).json({
//                 status: 'fail',
//                 data: {},
//                 hasError: true,
//                 errors: ["Authorization Failed."]
//             });
//         })
//     } catch {
//         return res.status(500).json({
//             status: 'fail',
//             data: {},
//             hasError: true,
//             errors: err
//         });
//     }
// }
