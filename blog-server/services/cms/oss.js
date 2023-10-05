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
  route.get('/list', validateToken, ossSchema.queryOSSList, ossControl.queryOSSList);
  route.get('/file/download', validateToken, ossSchema.downloadOSSFile, ossControl.downloadOSSFile);
  route.post('/upload', validateToken, upload.single('file'), ossSchema.uploadOSS, ossControl.uploadOSS);
  route.post('/delete', validateToken, ossSchema.deleteOSS, ossControl.deleteOSS);
  return route
}
