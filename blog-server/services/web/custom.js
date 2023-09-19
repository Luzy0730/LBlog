const express = require("express");
const customControl = require("../../controls/web/custom");
const route = express.Router();

route.get("/about", customControl.queryAbout);

module.exports = route;
