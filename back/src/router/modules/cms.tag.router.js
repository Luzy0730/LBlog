const express = require('express');
const { auth } = require('../../middleware/user.middleware');
const { canTagCreate, isTagExist } = require('../../middleware/tag.middleware');
const { validatePagination } = require('../../middleware/index.middleware');
const tagController = require('../../controller/tag.controller');
const router = express.Router();

router.post('/create', auth, canTagCreate, tagController.createTag);
router.post('/delete', auth, isTagExist, tagController.deleteTag);
router.post('/state', auth, isTagExist, tagController.stateTag);
router.post('/update', auth, isTagExist, tagController.updateTag);
router.get('/list', auth, validatePagination, tagController.getTagList);
router.get('/all', auth, tagController.getAllTag);

module.exports = { router, prefix: '/tag' };
