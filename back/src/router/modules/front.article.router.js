const express = require('express');
const ArticleController = require('../../controller/article.controller');
const router = express.Router();
const { validatePagination } = require('../../middleware/index.middleware');
const { analysisSearch } = require('../../middleware/article.middleware')

router.get('/list', validatePagination, analysisSearch, ArticleController.getArticleList);
router.get('/detail', ArticleController.getArticleDetail);

module.exports = { router, prefix: '/article' };
