const express = require("express");
const configControl = require("../../controls/config");
const route = express.Router();

route.get('/about', configControl.queryAbout);

module.exports = route
