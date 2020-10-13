//import user.service.js
const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
} = require("./user.service");
//for encrypting password
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  createUser: (req, res) => {
    console.log(req.body)
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err,results) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        status: 200,
        data: results
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if(err) {
        console.log(err);
      }
      if(!results) {
        return res.json({
          status: 400,
          message: "Record Not Found"
        });
      }
      return res.json({
        status: 200,
        message: "User Data Found",
        results: {
            profile: results
        }
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        status: 200,
        data: results
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if(err) {
        console.log(err);
        return;
      }
      if(!results) {
        return res.json({
          status: 400,
          message: "Failed to update user"
        });
      }
      return res.json({
        status: 200,
        message: "update successful"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if(err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          status: 300,
          message: "Record Not Found"
        });
      }
      return res.json({
        status: 200,
        message: "user deleted successfully"
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    console.log("following is passed into login():",req.body);
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          status: 400,
          message: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          status: 200,
          message: "login successfully",
          results: {
            profile: results,
            token: jsontoken
          }
        });
      } else {
        return res.json({
          status: 400,
          message: "Invalid email or password"
        });
      }
    });
  }
  // login: (req, res) => {
  //   const body = req.body;
  //   getUserByEmail(body.email, (err, results) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //     if(!results) {
  //       return res.json({
  //         success: 0,
  //         data: "Invalid email or password"
  //       });
  //     }
  //     const result = compareSync(body.password, results.password);
  //     if(result) {
  //        results.password = undefined;
  //        //define key in env file instead of hardcoding
  //        const jsontoken = sign({ result: results }, "qwe1234", {
  //          expiresIn: "1h"
  //        });
  //        return res.json({
  //          success: 1,
  //          message: "login successful",
  //          token: jsontoken
  //        });
  //     }else {
  //       return res.json({
  //         success: 0,
  //         data: "Invalid email or password"
  //       });
  //     }
  //   });
  // }
};
