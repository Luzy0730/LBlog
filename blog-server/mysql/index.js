const mysql = require("mysql");
const promisify = require("util").promisify;

class MysqlPool {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      user: "root",
      password: "Lzy@960730",
      database: "blog",
      charset: "utf8mb4",
    });
  }

  // 建立连接 返回连接
  connect() {
    const getConnection = promisify(this.pool.getConnection).bind(this.pool);
    return getConnection();
  }
  // 解除连接
  release(connection = this.pool) {
    connection.release();
  }
  /**
   *
   * @param {string} sql 查询语句
   * @param {any[]} params 查询占位符参数
   * @param {mysql.PoolConnection} connection 默认整个连接池 可配合connect手动传入指定连接 等所有异步操作如循环查询结束后 再调用release释放链接
   * @returns
   */
  query({ sql, params = [], connection = this.pool }) {
    const asyncQuery = promisify(connection.query).bind(connection);
    return asyncQuery(sql, params).then((result) => {
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
  }
}

module.exports = new MysqlPool();
