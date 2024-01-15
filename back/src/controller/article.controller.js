const ArticleService = require('../service/article.service');

class ArticleControl {
  async getArticleDetail(req, res) {
    const { id } = req.query;
    try {
      const ret = await ArticleService.getArticleDetail({ id });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async createArticle(req, res) {
    const { title, categoryId, description, content, tagIds, words } = req.body;
    try {
      const ret = await ArticleService.createArticle({ title, categoryId, description, content, tagIds, words });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async updateArticle(req, res) {
    const { id, title, categoryId, description, content, tagIds, words } = req.body;
    try {
      const ret = await ArticleService.updateArticle({ id, title, categoryId, description, content, tagIds, words });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error)
      req.app.locals.handleError(res, error);
    }
  }

  async getArticleList(req, res) {
    const { page, pageSize, title, categoryId, state, tagId, keyword } = req.query;
    try {
      const ret = await ArticleService.getArticleList({
        page, pageSize, title, categoryId, state, tagId, keyword
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }

  async setArticleState(req, res) {
    const { id, state } = req.body;
    try {
      const ret = await ArticleService.updateArticle({ id, state });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async deleteArticle(req, res) {
    const { id } = req.body;
    try {
      const ret = await ArticleService.deleteArticle({ id });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error)
      req.app.locals.handleError(res, error);
    }
  }

}

module.exports = new ArticleControl();
