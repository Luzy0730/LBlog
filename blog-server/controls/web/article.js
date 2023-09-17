const mysqlPool = require("../../mysql");
const { queryArticlesMain } = require('../main/article')

module.exports = {
  queryArticles: async (req, res) => {
    const { pageNum = 1, pageSize = 10, tagId, tagName, categoryName } = req.query
    const connection = await mysqlPool.connect();
    const param = { pagination: { pageNum, pageSize }, connection }
    if (tagId || tagName || categoryName) {
      param.where = {}
    }
    if (tagId) {
      param.where.tagId = tagId
    }
    if (tagName) {
      const tagId = (await mysqlPool.query({
        sql: "SELECT id FROM tag WHERE `name` = ?",
        params: [tagName],
        connection
      }))[0]['id']
      param.where.tagId = tagId
    }
    if (categoryName) {
      const categoryId = (await mysqlPool.query({
        sql: "SELECT id FROM category WHERE `name` = ?",
        params: [categoryName],
        connection
      }))[0]['id']
      param.where.categoryId = categoryId
    }
    queryArticlesMain(param).then(data => {
      mysqlPool.release(connection);
      res.customLimitSend(data.articles, data.articleTotal);
    })
  },
  queryArticleDetail: async (req, res) => {
    const { id } = req.query;
    const connection = await mysqlPool.connect();
    queryArticlesMain({
      where: { id },
      select: { description: false, content: true },
      connection
    }).then(({ articles }) => {
      mysqlPool.release(connection);
      res.customSend(...articles)
    })
  },
};
