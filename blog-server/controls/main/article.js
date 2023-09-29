const mysqlPool = require("../../mysql");

module.exports = {
  queryArticlesMain
}

// 查询文章主体函数
/**
 * 
 * @param {*} pagination 分页参数
 * @param {*} select 查询字段
 * @param {*} where 查询条件
 * @param {*} connection  链接
 * @returns 
 */
async function queryArticlesMain(options) {
  const { pagination = false, connection, where = {}, select = {} } = options
  const params = []
  // SELECT 条件
  let selectSql = "SELECT a.`id`, a.`is_enable`, a.`tag_ids` as `tags`, `title`, `views`,`words`,c.`id` AS `categoryId`,c.`name` AS `categoryName`,c.`color` AS `categoryColor`,c.`icon` AS `categoryIcon`, a.`create_time` AS `createTime`, a.`update_time` AS `updateTime` "
  const _select = { description: true, content: false }
  Object.assign(_select, select)
  const { description = true, content = false } = _select
  if (description) {
    selectSql += ", a.`description`"
  }
  if (content) {
    selectSql += ", a.`content`"
  }
  // WHERE 条件
  let whereSql = "FROM `article` AS a LEFT JOIN category AS c ON a.category_id = c.id"
  const _where = { isEnable: 1, isDelete: 0, id: null, tagId: null }
  Object.assign(_where, where)
  const { isEnable = 1, isDelete = 0, id = null, tagId = null, categoryId } = _where
  // isDelete
  const isDeleteSql = Array.isArray(isDelete) ? isDelete.join(',') : isDelete
  whereSql += ` WHERE a.is_delete IN (${isDeleteSql})`
  // isEnable
  const isEnableSql = Array.isArray(isEnable) ? isEnable.join(',') : isEnable
  whereSql += ` AND a.is_Enable IN (${isEnableSql})`
  // id
  if (id) {
    whereSql += ` AND a.id = ${id}`
  }
  // tagId
  if (tagId) {
    whereSql += ` AND CONCAT(',', a.tag_ids, ',') LIKE '%,${tagId},%'`
  }
  // categoryId
  if (categoryId) {
    whereSql += ` AND a.category_id = ${categoryId}`
  }
  // LIMIT 条件
  let paginationSql = ''
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = " LIMIT ? OFFSET ?"
    params.push(+pageSize, (+pageNum - 1) * +pageSize)
  }
  const _connection = connection ? connection : await mysqlPool.connect();
  // 文章数量查询sql
  const articles = await mysqlPool.query({
    sql: selectSql + whereSql + paginationSql,
    params,
    connection: _connection,
  });
  const articleCount = "SELECT COUNT(1) "
  const articleTotal = (await mysqlPool.query({
    sql: articleCount + whereSql,
    connection: _connection,
  }))[0]['COUNT(1)'];
  return Promise.all(
    articles.map((article) => {
      article.category = {
        id: article.categoryId,
        name: article.categoryName,
        color: article.categoryColor,
        icon: article.categoryIcon,
      };
      delete article.categoryId;
      delete article.categoryName;
      delete article.categoryColor;
      delete article.categoryIcon;
      return mysqlPool
        .query({
          sql: `SELECT id,name,color from tag WHERE id IN (${article.tags}) AND is_enable = 1 AND is_delete = 0`,
          connection: _connection,
        })
        .then((tags) => {
          article.tags = tags;
        });
    })
  ).then(() => {
    if (!connection) {
      mysqlPool.release(_connection);
    }
    return { articles, articleTotal }
  });
}

