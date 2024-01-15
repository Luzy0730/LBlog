const UserModel = require('../model/user.model');
const { Op } = require('sequelize');

class UserService {
  async getUserInfo({ id, username, password }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    password && Object.assign(whereOpt, { password });
    const res = await UserModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }

  async register({ nickname, avatar, username, password }) {
    const fieldOpt = { nickname, avatar, username, password };
    const res = await UserModel.create(fieldOpt);
    return res ? res.dataValues : null;
  }

  async getUserList({ page = 1, pageSize = 10, nickname, username, state }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = {};
    nickname &&
      Object.assign(where, { nickname: { [Op.like]: `%${nickname}%` } });
    username &&
      Object.assign(where, { username: { [Op.like]: `%${username}%` } });
    state && Object.assign(where, { state });
    const { count, rows } = await UserModel.findAndCountAll({
      attributes: { exclude: ['password'] },
      where,
      offset,
      limit,
    });
    return {
      total: count,
      data: rows,
    };
  }

  async updateUser({ id, nickname, avatar, password, state }) {
    const fieldOpt = {};
    avatar && Object.assign(fieldOpt, { avatar });
    nickname && Object.assign(fieldOpt, { nickname });
    password && Object.assign(fieldOpt, { password });
    state !== undefined && Object.assign(fieldOpt, { state });
    const res = await UserModel.update(fieldOpt, { where: { id } });
    return res ? res[0] : null;
  }

  async deleteUser(option) {
    const { id } = option;
    const res = await UserModel.destroy({ where: { id } });
    return res;
  }
}

module.exports = new UserService();
