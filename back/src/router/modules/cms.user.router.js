const express = require('express');
const {
  canUserRegister,
  validateLoginInfo,
  crpytPassword,
  crpytNewPwd,
  isUserExist,
  auth,
} = require('../../middleware/user.middleware');
const { validatePagination } = require('../../middleware/index.middleware');
const UserController = require('../../controller/user.controller');
const router = express.Router();

router.post('/register', canUserRegister, crpytPassword, UserController.register);
router.post('/login', validateLoginInfo, UserController.login);
router.get('/validate', auth, UserController.validate);
router.get('/list', auth, validatePagination, UserController.getUserList);
router.post('/state', auth, isUserExist, UserController.setUserState);
router.post('/delete', auth, isUserExist, UserController.deleteUser);
router.post('/update', auth, isUserExist, UserController.updateUser);
router.post('/pwd', auth, isUserExist, crpytNewPwd, UserController.updatePwd);

module.exports = { router, prefix: '/user' };
