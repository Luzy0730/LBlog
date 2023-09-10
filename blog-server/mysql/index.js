const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lzy@960730",
  database: "blog",
  port: 3306,
});

connection.connect();
module.exports = (sql, params, cb) => {
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error;
    let data = null;
    switch (sql.split(" ")[0]) {
      case "SELECT":
        data = results;
        break;
      case "INSERT":
        data = results.insertId;
        break;
      case "UPDATE":
        data = null;
        break;
      default:
        data = null;
        break;
    }
    cb({
      code: 200,
      data,
      msg: "success",
    });
  });
};
// connection.end();
