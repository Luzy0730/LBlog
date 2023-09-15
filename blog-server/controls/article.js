const mysqlPool = require("../mysql");

module.exports = {
  queryArticles: async (req, res) => {
    const connection = await mysqlPool.connect();
    const articles = await mysqlPool.query({
      sql: "SELECT a.`id`, a.`is_enable`, a.`tag_ids` as `tags`, `title`,`description`,`views`,`words`,c.`id` AS `categoryId`,c.`name` AS `categoryName`,c.`color` AS `categoryColor`,c.`icon` AS `categoryIcon` FROM `article` AS a LEFT JOIN category AS c ON a.cateogry_id = c.id WHERE a.is_delete = 0",
      auto: false,
      connection,
    });
    Promise.all(
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
      res.customSend({
        list: articles,
        total: articles.length,
      });
    });
  },
  // 启用文章
  enableArticle: (req, res) => {
    const { id, is_enable } = req.body;
    mysqlPool
      .query({
        sql: "UPDATE `article` SET `is_enable` = ?  WHERE `id` = ?",
        params: [is_enable, id],
      })
      .then((data) => {
        res.customSend(data);
      });
  },
  queryArticleDetail: (req, res) => {
    const { id } = req.query;
    mysqlPool
      .query({
        sql: "SELECT `id`,`description`,`content` FROM article WHERE `id` = ? ",
        params: [id],
      })
      .then((data) => {
        res.customSend(...data);
      });
  },
};
