const express = require("express");
const articleControl = require("../../controls/web/article");
const route = express.Router();

route.get("/", articleControl.queryArticles);
route.get("/detail", articleControl.queryArticleDetail);

module.exports = route;
