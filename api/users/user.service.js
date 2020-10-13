const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    const sql = "insert into User(email, password, profile_image, username, intro) values(?,?,?,?,?)";
    pool.query(
      // "insert into User(email, password, username) values(?,?,?)",
      sql,
      [
        data.email,
        data.password,
        data.profile_image,
        data.username,
        data.intro
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //probably will need to change this code to use in app
  getUserById: (id, callBack) => {
    pool.query(
      'select user_id, email, profile_image,username,intro from User where user_id = ?',
      [id],
      (error, results, fields) => {
        if(error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //have to change because it clashes with getUserById
  getUsers: callBack => {
    pool.query(
      'select user_id, email, profile_image, username from User',
      [],
      (error, results, fields) => {
        if(error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      "update User set profile_image = ?, intro = ? where user_id = ?",
      [
       data.profile_image,
       data.intro,
       data.user_id
     ],
     (error, results, fields) => {
       if(error) {
         return callBack(error);
       }
       return callBack(null, results);
     }
   );
 },
 deleteUser: (data, callBack) => {
   pool.query(
     'delete from User where user_id = ?',
     [data.user_id],
     (error,results,fields) => {
       if(error) {
         return callBack(error);
       }
       return callBack(null, results[0]);
     }
   );
 },
 getUserByEmail: (email, callBack) => {
   pool.query(
     'select * from User where email = ?',
     [email],
     (error, results, fields) => {
       if(error) {
         console.log("error");
         return callBack(error);
       }
       // console.log("getUserByEmail():",results);
       return callBack(null, results[0]);
     }
   )
 }
};
