const express = require("express");
const articleControl = require("../controls/article");
const route = express.Router();

route.get("/tag", articleControl.getTags);
route.post("/tag/add", articleControl.addTag);
route.post("/tag/remove", articleControl.removeTag);
route.post("/tag/update", articleControl.updateTag);
route.post("/tag/enable", articleControl.updateTag);

module.exports = route;
