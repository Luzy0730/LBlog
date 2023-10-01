const express = require("express");
const configControl = require("../../controls/cms/config");
const configSchema = require("../../schema/cms/config");
const route = express.Router();

module.exports = (app) => {
  const { validateToken } = app.locals
  route.get('/about', configControl.queryAbout);
  route.post('/about/update', validateToken, configSchema.updateAbout, configControl.updateAbout);
  route.get('/banner', configControl.queryBanner);
  route.post('/banner/update', validateToken, configSchema.updateBanner, configControl.updateBanner);
  route.get('/siteInfo', configControl.querySiteInfo);
  route.post('/siteInfo/update', validateToken, configSchema.updateSiteInfo, configControl.updateSiteInfo);
  route.get('/introduction', configControl.queryIntroduction);
  route.post('/introduction/update', validateToken, configSchema.updateIntroduction, configControl.updateIntroduction);
  return route
}
