const mysqlPool = require("../../mysql");
module.exports = {
  queryUsersMain,
  updateUserMain
}

async function queryUsersMain(options) {
  const { pagination = false, connection, where = {} } = options
  const params = []
  let selectSql = "SELECT id,nickname,avatar,username,is_admin isAdmin,create_time createTime,is_enable isEnable"
  let whereSql = " FROM `user`"
  let paginationSql = ''
  const _where = {}
  Object.assign(_where, where)
  const { username, password, id, isDelete = 0 } = _where
  const _connection = connection ? connection : await mysqlPool.connect();
  // 条件
  whereSql += ` WHERE is_delete=${isDelete}`
  if (username) whereSql += ` AND username='${username}'`
  if (password) whereSql += ` AND password=PASSWORD('${password}')`
  if (id) whereSql += ` AND id=${id}`
  // 分页
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = " LIMIT ? OFFSET ?"
    params.push(+pageSize, (+pageNum - 1) * +pageSize)
  }
  // 查询
  const users = await mysqlPool.query({
    sql: selectSql + whereSql + paginationSql,
    params,
    connection: _connection
  });
  if (!connection) {
    mysqlPool.release(_connection);
  }
  return pagination ? {
    users,
    userTotal: (await mysqlPool.query({
      sql: "SELECT COUNT(1) " + whereSql,
      connection: _connection,
    }))[0]['COUNT(1)']
  } : users
}

async function updateUserMain(options) {
  const { fields, where, connection } = options
  const { nickname, avatar, newPassword, password, isEnable, isDelete } = fields
  const _where = {}
  Object.assign(_where, where)
  const { id } = _where
  const _connection = connection ? connection : await mysqlPool.connect();
  // sql
  let selectSql = "UPDATE `user`";
  let fieldSql = " SET "
  let whereSql = ` WHERE id='${id}'`
  // 修改用户信息
  if (nickname) fieldSql += `nickname='${nickname}',`
  if (avatar) fieldSql += `avatar='${avatar}'`
  // 修改密码
  if (newPassword && password) {
    fieldSql += `password=PASSWORD('${newPassword}')`
    whereSql += ` AND password=PASSWORD('${password}')`
  }
  // 禁用
  if (isEnable !== undefined) {
    fieldSql += `is_enable=${isEnable}`
  }
  // 注销
  if (isDelete !== undefined) {
    fieldSql += `is_delete=${isDelete}`
  }
  // 执行sql
  const result = await mysqlPool.query({
    sql: selectSql + fieldSql + whereSql,
    connection: _connection,
  });
  if (!connection) {
    mysqlPool.release(_connection);
  }
  return result
}