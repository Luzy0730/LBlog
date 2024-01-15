const express = require('express');
const multer = require('multer');
const upload = multer();

const { auth } = require('../../middleware/user.middleware');
const CustomController = require('../../controller/custom.controller');
const OssController = require('../../controller/oss.controller');

const router = express.Router();

router.get('/list', auth, OssController.getOssFileList);
router.get('/download', auth, OssController.downloadOssFile);
router.post('/delete', auth, OssController.deleteOssFile);
router.post('/upload', auth, upload.single('file'), OssController.uploadOssFile);

module.exports = { router, prefix: '/oss' };
