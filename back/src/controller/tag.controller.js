const TagService = require('../service/tag.service');

class TagControl {
  // 创建标签
  async createTag(req, res) {
    const { name, color } = req.body;
    try {
      const ret = await TagService.createTag({ name, color });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 删除标签
  async deleteTag(req, res) {
    const { id } = req.body;
    try {
      const ret = await TagService.deleteTag({ id });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 标签状态
  async stateTag(req, res) {
    const { id, state } = req.body;
    try {
      const ret = await TagService.updateTag({ id, state });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新标签
  async updateTag(req, res) {
    const { id, name, color } = req.body;
    try {
      const ret = await TagService.updateTag({
        id,
        name,
        color,
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 获取标签列表
  async getTagList(req, res) {
    const { page, pageSize, name, state } = req.query;
    try {
      const ret = await TagService.getTagList({
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

  // 获取所有标签
  async getAllTag(req, res) {
    try {
      const ret = await TagService.getTagList({ state: 1, pageSize: 9999 });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }
}

module.exports = new TagControl();
