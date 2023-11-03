const mysqlPool = require("../../mysql");
const { queryArticlesMain } = require('../main/article')

module.exports = {
  queryArticles: async (req, res) => {
    const { pageNum = 1, pageSize = 10, tagId, tagName, categoryName, keyword } = req.query
    const connection = await mysqlPool.connect();
    const param = { pagination: { pageNum, pageSize }, connection, select: { description: true } }
    if (tagId || tagName || categoryName || keyword) {
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
      }))[0]?.['id'] || -1
      param.where.tagId = tagId
    }
    if (categoryName) {
      const categoryId = (await mysqlPool.query({
        sql: "SELECT id FROM category WHERE `name` = ?",
        params: [categoryName],
        connection
      }))[0]?.['id'] || -1
      param.where.categoryId = categoryId
    }
    if (keyword) {
      param.where.keyword = keyword
    }
    queryArticlesMain(param).then(data => {
      mysqlPool.release(connection);
      res.customLimitSend(data.articles, data.articleTotal);
    })
  },
  queryArticleDetail: async (req, res) => {
    const { id } = req.query;
    queryArticlesMain({
      pagination: false,
      where: { id },
      select: { content: true },
    }).then(({ articles }) => {
      res.customSend(...articles)
    })
  },
};
