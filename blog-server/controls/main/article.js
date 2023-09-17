const mysqlPool = require("../../mysql");

module.exports = {
  queryArticlesMain
}

/**
 * 
 * @param {页码} pageNum 
 * @param {页数} pageSize 
 * @param {是否所有} all 
 * @returns 
 */
async function queryArticlesMain(pageNum, pageSize, all = false) {
  const connection = await mysqlPool.connect();
  const articles = await mysqlPool.query({
    sql: "SELECT a.`id`, a.`is_enable`, a.`tag_ids` as `tags`, `title`,`description`,`views`,`words`,c.`id` AS `categoryId`,c.`name` AS `categoryName`,c.`color` AS `categoryColor`,c.`icon` AS `categoryIcon`, a.`create_time` AS `createTime`, a.`update_time` AS `updateTime` FROM `article` AS a LEFT JOIN category AS c ON a.category_id = c.id WHERE a.is_delete = 0 " + `${all ? "" : "AND a.`is_enable` = 1"}` + " LIMIT ? OFFSET ?",
    params: [+pageSize, (+pageNum - 1) * +pageSize],
    connection,
  });
  const articleTotal = (await mysqlPool.query({
    sql: "SELECT COUNT(1) FROM `article` AS a LEFT JOIN category AS c ON a.category_id = c.id WHERE a.is_delete = 0 " + `${all ? "" : "AND a.`is_enable` = 1"}`,
    connection,
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
      delete article.categoryname;
      delete article.categoryColor;
      delete article.categoryIcon;
      return mysqlPool
        .query({
          sql: `SELECT id,name,color from tag WHERE id IN (${article.tags}) AND is_enable = 1 AND is_delete = 0`,
          connection,
        })
        .then((tags) => {
          article.tags = tags;
        });
    })
  ).then(() => {
    mysqlPool.release(connection);
    return { articles, articleTotal }
  });
}

