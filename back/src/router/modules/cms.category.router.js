const express = require('express');
const {
  canCategoryCreate,
  isCategoryExist,
} = require('../../middleware/category.middleware');
const { validatePagination } = require('../../middleware/index.middleware');
const { auth } = require('../../middleware/user.middleware');
const CategoryController = require('../../controller/category.controller');
const router = express.Router();

router.post('/create', auth, canCategoryCreate, CategoryController.createCategory);
router.post('/delete', auth, isCategoryExist, CategoryController.deleteCategory);
router.post('/update', auth, isCategoryExist, CategoryController.updateCategory)
router.post('/state', auth, isCategoryExist, CategoryController.stateCategory);
router.get('/list', auth, validatePagination, CategoryController.getCategoryList);
router.get('/all', auth, CategoryController.getAllCategory);

module.exports = { router, prefix: '/category' };
