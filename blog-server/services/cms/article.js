const express = require("express");
const articleControl = require("../../controls/cms/article");
const route = express.Router();

route.get("/", articleControl.queryArticles);
route.get("/detail", articleControl.queryArticleDetail);
route.post("/enable", articleControl.enableArticle);
route.post("/update", articleControl.updateArticle);

module.exports = route;
