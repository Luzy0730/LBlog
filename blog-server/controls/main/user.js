const mysqlPool = require("../../mysql");
module.exports = {
  queryUsersMain
}

async function queryUsersMain(options) {
  const { pagination = false, connection, where = {} } = options
  const params = []
  // SELECT 条件
  let selectSql = "SELECT id,nickname,avatar,username,is_admin isAdmin,create_time createTime,is_enable isEnable"
  // WHERE 条件
  let whereSql = " FROM `user`"
  const _where = {}
  Object.assign(_where, where)
  const { username, password, id } = _where
  if (username || password || id) whereSql += " WHERE "
  if (username) whereSql += `username='${username}'`
  if (password || id && username) whereSql += " AND "
  if (password) whereSql += `password=PASSWORD('${password}')`
  if (id && password) whereSql += " AND "
  if (id) whereSql += `id=${id}`
  // LIMIT 条件
  let paginationSql = ''
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = " LIMIT ? OFFSET ?"
    params.push(+pageSize, (+pageNum - 1) * +pageSize)
  }
  const _connection = connection ? connection : await mysqlPool.connect();
  // 用户数量查询sql
  const users = await mysqlPool.query({
    sql: selectSql + whereSql + paginationSql,
    params,
    connection: _connection
  });
  const userCount = "SELECT COUNT(1) "
  const userTotal = pagination ? (await mysqlPool.query({
    sql: userCount + whereSql,
    connection: _connection,
  }))[0]['COUNT(1)'] : users.length
  if (!connection) {
    mysqlPool.release(_connection);
  }
  return pagination ? { users, userTotal } : users
}