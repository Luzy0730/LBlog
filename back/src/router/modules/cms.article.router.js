const express = require('express');
const ArticleController = require('../../controller/article.controller');
const { auth } = require('../../middleware/user.middleware');
const router = express.Router();

router.post('/create', auth, ArticleController.createArticle);
router.post('/update', auth, ArticleController.updateArticle);
router.post('/state', auth, ArticleController.setArticleState);
router.post('/delete', auth, ArticleController.deleteArticle);

module.exports = { router, prefix: '/article' };
