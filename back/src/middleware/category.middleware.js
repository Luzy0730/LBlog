const {
  categoryFormateError,
  categoryIsAlreayExist,
  categoryIsNotExist,
} = require('../constant/err.type');
const CategoryService = require('../service/category.service');

const canCategoryCreate = async (req, res, next) => {
  const { name, color, icon } = req.body;
  if (!name || !color || !icon) {
    res.app.emit('error', categoryFormateError, res);
    return;
  }
  try {
    // 名称是否重复
    const ret = await CategoryService.getCategoryInfo({ name });
    if (ret) {
      res.app.emit('error', categoryIsAlreayExist, res);
      return;
    }
  } catch (error) {
    console.log(err)
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

const isCategoryExist = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.app.emit('error', categoryFormateError, res);
    return;
  }
  try {
    const ret = await CategoryService.getCategoryInfo({ id });
    if (!ret) {
      res.app.emit('error', categoryIsNotExist, res);
      return;
    }
  } catch (error) {
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

module.exports = { canCategoryCreate, isCategoryExist };
