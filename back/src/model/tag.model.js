const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');
const Tag = seq.define(
  'tag',
  {
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: '标签名称',
    },
    color: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: '标签颜色',
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '1: 启用 0: 停用',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);


// Tag.sync({ force: true });

module.exports = Tag;
