const { queryArticlesMain } = require('../main/article')

module.exports = {
  queryArticles: async (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query
    queryArticlesMain(pageNum, pageSize).then(data => {
      res.customLimitSend(data.articles, data.articleTotal);
    })
  },
};
