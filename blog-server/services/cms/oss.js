const express = require("express");
const multer = require('multer');
const ossControl = require("../../controls/cms/oss");
const ossSchema = require("../../schema/cms/oss");
const route = express.Router();
const upload = multer();
module.exports = (app) => {
  const { validateToken } = app.locals
  route.get('/', ossControl.queryOSSConfig);
  route.post('/update', validateToken, ossSchema.updateOSS, ossControl.updateOSSConfig);
  route.get('/list', validateToken, ossControl.queryOSSList);
  route.get('/file/download', validateToken, ossControl.downloadOSSFile);
  route.post('/upload', validateToken, upload.single('file'), ossControl.uploadOSS);
  route.post('/delete', validateToken, ossControl.deleteOSS);
  return route
}
