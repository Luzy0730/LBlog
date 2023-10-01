const express = require("express");
const userControl = require("../../controls/cms/user");
const userSchema = require('../../schema/cms/user.js')
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.get("/", validateToken, userSchema.queryUsers, userControl.queryUsers);
  route.post("/login", userSchema.login, userControl.login);
  route.post("/validate", validateToken, userControl.validateUser);
  route.post("/update", validateToken, userSchema.updateUser, userControl.updateUser);
  route.post("/update/pwd", validateToken, userSchema.updatePassword, userControl.updatePassword);
  route.post("/enable", validateToken, userSchema.enableUser, userControl.enableUser);
  route.post("/delete", validateToken, userSchema.deleteUser, userControl.deleteUser);
  return route;
}
