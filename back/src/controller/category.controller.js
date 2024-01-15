const CategoryService = require('../service/category.service');

class CategoryControl {
  // 创建分类
  async createCategory(req, res) {
    const { name, color, icon } = req.body;
    try {
      const ret = await CategoryService.createCategory({ name, color, icon });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async stateCategory(req, res) {
    const { id, state } = req.body;
    try {
      const ret = await CategoryService.updateCategory({ id, state });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.body;
    try {
      const ret = await CategoryService.deleteCategory({ id });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async updateCategory(req, res) {
    const { id, name, color, icon } = req.body;
    try {
      const ret = await CategoryService.updateCategory({
        id,
        name,
        color,
        icon,
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async getCategoryList(req, res) {
    const { page, pageSize, name, state } = req.query;
    try {
      const ret = await CategoryService.getCategoryList({
        page,
        pageSize,
        name,
        state,
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }

  // 获取所有分类
  async getAllCategory(req, res) {
    try {
      const ret = await CategoryService.getCategoryList({ state: 1, pageSize: 9999 });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }
}

module.exports = new CategoryControl();
