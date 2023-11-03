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
  let selectSql = "SELECT a.`id`, a.`is_enable`, a.`tag_ids` as `tags`, `title`, `views`,`words`,c.`id` AS `categoryId`,c.`name` AS `categoryName`,c.`color` AS `categoryColor`,c.`icon` AS `categoryIcon`, a.`create_time` AS `createTime`, a.`update_time` AS `updateTime` "
  let whereSql = "FROM `article` AS a LEFT JOIN category AS c ON a.category_id = c.id AND c.is_delete=0"
  let haveSql = ""
  let orderSql = ""
  let paginationSql = ''
  const { pagination = { pageNum: 1, pageSize: 10 }, connection, where = {}, select = {} } = options
  const _connection = connection ? connection : await mysqlPool.connect();
  const _where = { isEnable: 1, isDelete: 0, id: null, tagId: null, keyword: null }
  Object.assign(_where, where)
  const { isEnable = 1, isDelete = 0, id = null, tagId = null, categoryId, keyword } = _where
  const _select = { description: false, content: false }
  Object.assign(_select, select)
  const { description, content } = _select
  // SELECT 条件
  if (description) {
    selectSql += ", a.`description`"
  }
  if (content) {
    selectSql += ", a.`content`"
  }
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
  // 关键字查询
  if (keyword) {
    selectSql += `, (100 * (LENGTH(title) - LENGTH(REPLACE(LOWER(title), LOWER('${keyword}'), ''))) / LENGTH('${keyword}') +50 * (LENGTH(description) - LENGTH(REPLACE(LOWER(description), LOWER('${keyword}'), ''))) / LENGTH('${keyword}') + 5 * (LENGTH(content) - LENGTH(REPLACE(LOWER(content), LOWER('${keyword}'), ''))) / LENGTH('${keyword}')) AS total_score `
    whereSql += ` AND (LOWER(title) LIKE CONCAT('%', LOWER('${keyword}'), '%') OR description LIKE CONCAT('%', LOWER('${keyword}'), '%') OR content LIKE CONCAT('%', LOWER('${keyword}'), '%'))`
    haveSql += " HAVING total_score > 50"
    orderSql += " ORDER BY total_score DESC "
  }
  orderSql += orderSql ? ",a.`create_time` DESC " : " ORDER BY a.`create_time` DESC "
  // 分页
  if (pagination) {
    const { pageNum = 1, pageSize = 10 } = pagination
    paginationSql = ` LIMIT ${+pageSize} OFFSET ${(+pageNum - 1) * +pageSize}`
  }
  // 查询
  const articles = await mysqlPool.query({
    sql: selectSql + whereSql + haveSql + orderSql + paginationSql,
    connection: _connection,
  });
  // 总数
  const articleTotal = pagination && (await mysqlPool.query({
    sql: "SELECT COUNT(1) " + whereSql,
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
          sql: `SELECT id,name,color from tag WHERE id IN (${article.tags || -1}) AND is_enable = 1 AND is_delete = 0`,
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

