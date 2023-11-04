const mysqlPool = require("../../mysql");
module.exports = {
  queryTagsMain,
}

async function queryTagsMain(options = {}) {
  const { pagination, connection, where = {}, simple = true } = options
  let selectSql = "SELECT id,name,color"
  let whereSql = " FROM `tag`"
  let paginationSql = ''
  const _where = {}
  Object.assign(_where, where)
  const { isDelete = 0, isEnable } = _where
  const _connection = connection ? connection : await mysqlPool.connect();
  // 条件
  whereSql += ` WHERE is_delete=${isDelete}`
  // 是否简略信息
  if (!simple) {
    selectSql += " ,color,is_enable"
  }
  if (isEnable !== undefined) {
    whereSql += ` AND is_enable=${isEnable}`
  }
  // 分页
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = ` LIMIT ${+pageSize} OFFSET ${(+pageNum - 1) * +pageSize}`
  }
  // 查询
  const tags = await mysqlPool.query({
    sql: selectSql + whereSql + paginationSql,
    connection: _connection
  });
  // 总数
  const tagsTotal = pagination && (await mysqlPool.query({
    sql: "SELECT COUNT(1) " + whereSql,
    connection: _connection,
  }))[0]['COUNT(1)']
  // 释放
  if (!connection) {
    mysqlPool.release(_connection);
  }
  return pagination
    ? { tags, tagsTotal }
    : tags
}