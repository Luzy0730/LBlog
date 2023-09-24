const express = require("express");
const configControl = require("../../controls/cms/config");
const route = express.Router();

route.get('/about', configControl.queryAbout);
route.post('/about/update', configControl.updateAbout);
route.get('/banner', configControl.queryBanner);
route.post('/banner/update', configControl.updateBanner);
route.get('/siteInfo', configControl.querySiteInfo);
route.post('/siteInfo/update', configControl.updateSiteInfo);
module.exports = route
