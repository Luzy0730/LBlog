const express = require('express');
const { auth } = require('../../middleware/user.middleware');
const { canTagCreate, isTagExist } = require('../../middleware/tag.middleware');
const { validatePagination } = require('../../middleware/index.middleware');
const CustomController = require('../../controller/custom.controller');
const router = express.Router();

router.post('/about/update', auth, CustomController.updateCustomAbout);
router.post('/banner/update', auth, CustomController.updateCustomBanner);
router.post('/site/update', auth, CustomController.updateCustomSite);
router.post(
  '/introduction/update',
  auth,
  CustomController.updateCustomIntroduction
);
router.post('/oss/update', auth, CustomController.updateCustomOSS);

module.exports = { router, prefix: '/config' };
