const express = require("express");
const customControl = require("../../controls/web/custom");
const route = express.Router();

route.get("/about", customControl.queryAbout);
route.get("/banner", customControl.queryBanner);
route.get("/siteInfo", customControl.querySiteInfo);
route.get('/introduction', customControl.queryIntroduction);
module.exports = route;
