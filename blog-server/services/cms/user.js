const express = require("express");
const userControl = require("../../controls/cms/user");
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.get("/", validateToken, userControl.queryUsers);
  route.post("/login", userControl.login);
  route.post("/validate", validateToken, userControl.validateUser);
  return route;
}
