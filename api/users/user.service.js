const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    const sql = "insert into User(email, password, username) values(?,?,?)";
    pool.query(
      // "insert into User(email, password, username) values(?,?,?)",
      sql,
      [
        data.email,
        data.password,
        data.username
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
      'select user_id, email, profile_image,username from User where user_id = ?',
      [id],
      (error, results, fields) => {
        if(error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
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
      'update User set email=?,password=?,profile_image=?,username=? where user_id = ?',
      [
       data.email,
       data.password,
       data.profile_image,
       data.username,
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
         return callBack(error);
       }
       return callBack(null, results[0]);
     }
   )
 }
};
