const express = require('express');
const CustomController = require('../../controller/custom.controller');
const router = express.Router();

router.get('/about/get', CustomController.getCustomAbout);
router.get('/banner/get', CustomController.getCustomBanner);
router.get('/site/get', CustomController.getCustomSite);
router.get('/introduction/get', CustomController.getCustomIntroduction);
router.get('/oss/get', CustomController.getCustomOSS);

module.exports = { router, prefix: '/config' };
