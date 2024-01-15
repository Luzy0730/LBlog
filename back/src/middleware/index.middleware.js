const {
  paginationFormateError
} = require('../constant/err.type');
const { isNonNegativeInteger} = require('../utils/validate')

// 分页格式校验
const validatePagination = async (req, res, next) => {
  const { page, pageSize } = req.query;
  // 参数校验
  if (!page || !pageSize) {
    res.app.emit('error', paginationFormateError, res);
    return;
  }
  if (!isNonNegativeInteger(page) || !isNonNegativeInteger(pageSize)) {
    return res.app.emit('error', paginationFormateError, res);
  }
  // string转number
  req.query.page = parseInt(req.query.page, 10);
  req.query.pageSize = parseInt(req.query.pageSize, 10);

  next();
};

module.exports = { validatePagination };
