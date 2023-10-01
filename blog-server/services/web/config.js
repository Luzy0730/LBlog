const express = require("express");
const configControl = require("../../controls/web/config");
const route = express.Router();

route.get("/about", configControl.queryAbout);
route.get("/banner", configControl.queryBanner);
route.get("/siteInfo", configControl.querySiteInfo);
route.get('/introduction', configControl.queryIntroduction);
module.exports = route;
