const mysqlPool = require("../../mysql");
const { queryArticlesMain } = require('../main/article')

module.exports = {
  queryArticles: async (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query
    queryArticlesMain(pageNum, pageSize).then(data => {
      res.customLimitSend(data.articles, data.articleTotal);
    })
  },
  queryArticleDetail: async (req, res) => {
    const { id } = req.query;
    const connection = await mysqlPool.connect();
    const article = (await mysqlPool
      .query({
        sql: "SELECT a.`id`, a.`content` as`content`, a.`tag_ids` as `tags`, `title`,`views`,`words`,c.`id` AS `categoryId`,c.`name` AS `categoryName`,c.`color` AS `categoryColor`,c.`icon` AS `categoryIcon`, a.`create_time` AS `createTime`, a.`update_time` AS `updateTime` FROM `article` AS a LEFT JOIN category AS c ON a.category_id = c.id WHERE a.`id` = ? AND a.`is_enable` = 1 AND a.`is_delete` = 0",
        params: [id],
        connection
      }))[0]
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
    mysqlPool
      .query({
        sql: `SELECT id,name,color from tag WHERE id IN (${article.tags}) AND is_enable = 1 AND is_delete = 0`,
        connection,
      }).then(tags => {
        article.tags = tags;
      }).then(() => {
        mysqlPool.release(connection);
        res.customSend(article)
      })
  },
};
