const express = require("express");
const articleControl = require("../controls/article");
const route = express.Router();

route.post("/tag/add", articleControl.addTag);
route.post("/tag/remove", articleControl.removeTag);
route.post("/tag/update", articleControl.updateTag);
route.post("/tag/enable", articleControl.enableTag);
route.get("/tag", articleControl.getTags);

route.post("/category/add", articleControl.addCategory);
route.post("/category/remove", articleControl.removeCategory);
route.post("/category/update", articleControl.updateCategory);
route.get("/category", articleControl.getCategories);

module.exports = route;
