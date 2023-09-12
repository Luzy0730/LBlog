const express = require("express");
const categoryControl = require("../controls/category");
const route = express.Router();

route.post("/create", categoryControl.createCategory);
route.post("/delete", categoryControl.deleteCategory);
route.post("/update", categoryControl.updateCategory);
route.post("/enable", categoryControl.enableCategory);
route.get("/", categoryControl.queryCategories);

module.exports = route;
