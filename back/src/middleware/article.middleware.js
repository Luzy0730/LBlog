const CategoryService = require('../service/category.service');
const TagService = require('../service/tag.service');

const analysisSearch = async (req, res, next) => {
  const { categoryName, tagName } = req.query
  try {
    if (categoryName) {
      const { id: categoryId } = await CategoryService.getCategoryInfo({ name: categoryName });
      req.query.categoryId = categoryId
    }
    if (tagName) {
      const { id: tagId } = await TagService.getTagInfo({ name: tagName });
      req.query.tagId = tagId
    }
  } catch (error) {
    console.log(err)
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

module.exports = { analysisSearch };
