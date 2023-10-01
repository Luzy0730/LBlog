const mysqlPool = require("../../mysql");
module.exports = {
  queryCategoriesMain,
}

async function queryCategoriesMain(options = {}) {
  const { pagination, connection, where = {}, simple = true } = options
  let selectSql = "SELECT id,name"
  let whereSql = " FROM `category`"
  let paginationSql = ''
  const _where = {}
  Object.assign(_where, where)
  const { isDelete = 0 } = _where
  const _connection = connection ? connection : await mysqlPool.connect();
  // 条件
  whereSql += ` WHERE is_delete=${isDelete}`
  // 是否简略信息
  if (!simple) {
    selectSql += " ,color,icon, is_enable"
  }
  // 分页
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = ` LIMIT ${+pageSize} OFFSET ${(+pageNum - 1) * +pageSize}`
  }
  // 查询
  const categories = await mysqlPool.query({
    sql: selectSql + whereSql + paginationSql,
    connection: _connection
  });
  // 总数
  const categoriesTotal = pagination && (await mysqlPool.query({
    sql: "SELECT COUNT(1) " + whereSql,
    connection: _connection,
  }))[0]['COUNT(1)']
  // 释放
  if (!connection) {
    mysqlPool.release(_connection);
  }
  return pagination
    ? { categories, categoriesTotal }
    : categories
}