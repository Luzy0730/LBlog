const express = require("express");
const articleControl = require("../../controls/cms/article");
const articleSchema = require('../../schema/cms/article.js')
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.get("/", articleSchema.queryArticles, articleControl.queryArticles);
  route.get("/detail", articleSchema.queryArticleDetail, articleControl.queryArticleDetail);
  route.post("/enable", validateToken, articleSchema.enableArticle, articleControl.enableArticle);
  route.post("/update", validateToken, articleSchema.updateArticle, articleControl.updateArticle);
  route.post("/create", validateToken, articleSchema.createArticle, articleControl.createArticle);
  route.post("/delete", validateToken, articleSchema.deleteArticle, articleControl.deleteArticle);
  return route
}
