const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');

const User = seq.define(
  'user',
  {
    nickname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '昵称',
    },
    avatar: {
      type: DataTypes.TEXT,
      comment: '头像',
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '密码',
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '1: 启用 0: 停用',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);

// User.sync({ force: true });

module.exports = User;
