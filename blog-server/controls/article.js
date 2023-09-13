const mysql = require("../mysql");

module.exports = {
  queryArticles: async (req, res) => {
    mysql.connect();
    const articles = await mysql.query({
      sql: "SELECT a.`id`,`title`,`description`,`views`,`words`,c.`id` AS `category_id`,c.`name` AS `ategory_name`,c.`color` AS `category_color`,c.`icon` AS `category_icon` FROM `article` AS a LEFT JOIN category AS c ON a.cateogry_id = c.id",
      auto: false,
    });
    Promise.all(
      articles.map((article) =>
        mysql
          .query({
            sql: "SELECT t.id as tag_id,t.`name` as tag_name,t.color as tag_color from tag_rel_article as t_r_a LEFT JOIN article as a ON t_r_a.article_id = a.id LEFT JOIN tag as t ON t_r_a.tag_id = t.id WHERE a.id = ?",
            params: [article.id],
            auto: false,
          })
          .then((tags) => {
            article.tags = tags;
          })
      )
    ).then(() => {
      mysql.end();
      res.customSend({
        list: articles,
        total: articles.length,
      });
    });
  },
};
