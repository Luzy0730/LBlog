const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config_default');
const UserService = require('../service/user.service');
const {
  userFormateError,
  userIsNotExist,
  invalidToken,
} = require('../constant/err.type');

// 用户信息校验
const canUserRegister = async (req, res, next) => {
  const { username, password } = req.body;
  // 合法性
  if (!username || !password) {
    res.app.emit('error', userFormateError, res);
    return;
  }
  try {
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (ret) {
      req.app.locals.handleError(res, { msg: '用户名已经存在' });
      return;
    }
  } catch (error) {
    console.log(err);
    req.app.locals.handleError(res, error);
    return;
  }
  req.body.nickname = username;
  next();
};

// 校验登录合法性
const validateLoginInfo = async (req, res, next) => {
  const { username, password } = req.body;
  // 合法性
  if (!username || !password) {
    res.app.emit('error', userFormateError, res);
    return;
  }
  try {
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (!ret || ret.state === 0) {
      res.app.emit('error', userIsNotExist, res);
      return;
    }
    if (bcryptjs.compareSync(password, ret.password)) {
      req.body.userInfo = ret;
    } else {
      req.app.locals.handleError(res, { msg: '用户名或密码错误' });
      return;
    }
  } catch (error) {
    console.log(error);
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

// 校验权限
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.app.emit('error', invalidToken, res);
  const token = authorization.substring(7); // 去掉 Bearer 后的空格，剩下的部分就是访问令牌
  try {
    // user中包含了payload的信息(id, userName, is_admin)
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { id } = userInfo
    const ret = await UserService.getUserInfo({ id });
    if (!ret || ret.state === 0) {
      res.app.emit('error', invalidToken, res);
      return;
    }
    const { password, ...info } = ret
    req.body.userInfo = info;
  } catch (err) {
    switch (err.name) {
      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return res.app.emit('error', invalidToken, res);
    }
  }
  next();
};

const isUserExist = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.app.emit('error', userFormateError, res);
    return;
  }
  try {
    const ret = await UserService.getUserInfo({ id });
    if (!ret) {
      res.app.emit('error', userIsNotExist, res);
      return;
    }
  } catch (error) {
    req.app.locals.handleError(res, error);
    return;
  }
  next();
};

// 密码加密
const crpytPassword = async (req, res, next) => {
  const { password } = req.body;
  const salt = bcryptjs.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcryptjs.hashSync(password, salt);
  req.body.password = hash;
  next();
};

// 密码修改
const crpytNewPwd = async (req, res, next) => {
  const { id, password, newPassword } = req.body;
  // 合法性
  if (!id || !password || !newPassword) {
    res.app.emit('error', { msg: '缺少必要参数' }, res);
    return;
  }
  const salt = bcryptjs.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcryptjs.hashSync(password, salt);
  try {
    const ret = await UserService.getUserInfo({ id });
    if (!bcryptjs.compareSync(password, ret.password)) {
      req.app.locals.handleError(res, { msg: '旧密码输入错误' });
      return;
    }
  } catch (error) {
    req.app.locals.handleError(res, error);
    return;
  }
  const hash2 = bcryptjs.hashSync(newPassword, salt);
  req.body.password = hash2;
  next();
}

module.exports = { canUserRegister, validateLoginInfo, isUserExist, crpytPassword, crpytNewPwd, auth };
