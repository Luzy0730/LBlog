const express = require("express");
const articleControl = require("../../controls/article");
const route = express.Router();

route.get("/", articleControl.queryArticles);

module.exports = route;
