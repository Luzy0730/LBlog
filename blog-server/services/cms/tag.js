const express = require("express");
const tagControl = require("../../controls/cms/tag");
const tagSchema = require("../../schema/cms/tag");
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.post("/create", validateToken, tagSchema.createTag, tagControl.createTag);
  route.post("/delete", validateToken, tagSchema.deleteTag, tagControl.deleteTag);
  route.post("/update", validateToken, tagSchema.updateTag, tagControl.updateTag);
  route.post("/enable", validateToken, tagSchema.enableTag, tagControl.enableTag);
  route.get("/", tagSchema.queryTags, tagControl.queryTags);
  route.get("/simple", tagControl.queryTagsSimple);
  return route
}
