const express = require("express");
const configControl = require("../../controls/cms/config");
const route = express.Router();

route.get('/about', configControl.queryAbout);
route.post('/about/update', configControl.updateAbout);

module.exports = route
