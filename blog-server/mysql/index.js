const mysql = require("mysql");
const promisify = require("util").promisify;

let connection = null;

const connect = () => {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lzy@960730",
    database: "blog",
    port: 3306,
  });
  connection.connect((error) => {
    if (error) throw error;
  });
};

const end = () => connection.end();

module.exports = {
  /**
   *
   * @param {string} sql sql语句
   * @param {Array<any>} params sql占位参数
   * @param {Boolean} auto 自动链接
   * @returns
   */
  query: ({ sql, params = [], auto = true }) => {
    if (auto) connect();
    const asyncQuery = promisify(connection.query).bind(connection);
    return asyncQuery(sql, params).then((result) => {
      if (auto) end();
      let data = null;
      switch (sql.split(" ")[0]) {
        case "SELECT":
          data = result;
          break;
        case "INSERT":
          data = result.insertId;
          break;
        case "UPDATE":
          data = null;
          break;
        default:
          data = null;
          break;
      }
      return data;
    });
  },
  connect,
  end,
};
