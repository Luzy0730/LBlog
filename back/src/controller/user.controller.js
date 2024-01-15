const UserService = require('../service/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config_default');

class UserControl {
  // 注册
  async register(req, res) {
    const { nickname, avatar, username, password } = req.body;
    try {
      const ret = await UserService.register({ nickname, avatar, username, password });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }

  // 登录
  async login(req, res) {
    const { username, id } = req.body.userInfo;
    try {
      const token = jwt.sign({ username, id }, JWT_SECRET);
      req.app.locals.handleData(res, { userInfo: { username, id }, token });
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }

  // 校验
  async validate(req, res) {
    const { userInfo } = req.body;
    req.app.locals.handleData(res, userInfo);
  }

  // 获取用户列表
  async getUserList(req, res) {
    const { page, pageSize, nickname, username, state } = req.query;
    try {
      const ret = await UserService.getUserList({
        page,
        pageSize,
        nickname,
        username,
        state
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      console.log(error);
      req.app.locals.handleError(res, error);
    }
  }

  async setUserState(req, res) {
    const { id, state } = req.body;
    try {
      const ret = await UserService.updateUser({ id, state });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;
    try {
      const ret = await UserService.deleteUser({ id });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async updateUser(req, res) {
    const { id, nickname, avatar } = req.body;
    try {
      const ret = await UserService.updateUser({
        id, nickname, avatar
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async updatePwd(req, res) {
    const { id, password } = req.body;
    try {
      const ret = await UserService.updateUser({
        id, password
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

}

module.exports = new UserControl();
