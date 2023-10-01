const express = require("express");
const categoryControl = require("../../controls/cms/category");
const categorySchema = require('../../schema/cms/category.js')
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.post("/create", validateToken, categorySchema.createCategory, categoryControl.createCategory);
  route.post("/delete", validateToken, categorySchema.deleteCategory, categoryControl.deleteCategory);
  route.post("/update", validateToken, categorySchema.updateCategory, categoryControl.updateCategory);
  route.post("/enable", validateToken, categorySchema.enableCategory, categoryControl.enableCategory);
  route.get("/", categorySchema.queryCategories, categoryControl.queryCategories);
  route.get("/simple", categoryControl.queryCategoriesSimple);
  return route
}
