const { tagFormateError, tagIsAlreayExist, tagIsNotExist } = require('../constant/err.type');
const TagService = require('../service/tag.service');

const canTagCreate = async (req, res, next) => {
  const { name, color } = req.body;
  if (!name || !color) {
    res.app.emit('error', tagFormateError, res);
    return;
  }
  try {
    // 名称是否重复
    const ret = await TagService.getTagInfo({ name });
    if (ret) {
      res.app.emit('error', tagIsAlreayExist, res);
      return;
    }
  } catch (error) {
    console.log(error);
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

const isTagExist = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.app.emit('error', tagFormateError, res);
    return;
  }
  try {
    const ret = await TagService.getTagInfo({ id });
    if (!ret) {
      res.app.emit('error', tagIsNotExist, res);
      return;
    }
  } catch (error) {
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

module.exports = { canTagCreate, isTagExist };

