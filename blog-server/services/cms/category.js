const express = require("express");
const categoryControl = require("../../controls/cms/category");
const route = express.Router();

route.post("/create", categoryControl.createCategory);
route.post("/delete", categoryControl.deleteCategory);
route.post("/update", categoryControl.updateCategory);
route.post("/enable", categoryControl.enableCategory);
route.get("/", categoryControl.queryCategory);
route.get("/simple", categoryControl.queryCategorySimple);

module.exports = route;
