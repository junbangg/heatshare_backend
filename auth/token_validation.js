// const { verify } = require("jsonwebtoken");
//
// module.exports = {
//   checkToken: (req, res, next) => {
//     let token = req.get("authorization");
//     if(token) {
//         token = token.slice(7);
//         verify(token, "qwe1234", (err, decoded) => {
//           if(err) {
//             res.json({
//               success: 0,
//               message: "invalid token"
//             });
//           } else{
//             next();
//           }
//         })
//     }else {
//       res.json({
//         success: 0,
//         message: "Access denied! Unauthorized user"
//       });
//     }
//   }
// };
const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && token.split(' ')[1];
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            status: 300,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status: 400,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
