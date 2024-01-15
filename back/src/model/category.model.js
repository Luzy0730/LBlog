const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');

const Category = seq.define(
  'category',
  {
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment:'分类名称'
    },
    color: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment:'颜色'
    },
    icon: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment:'图标名'
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

// Category.sync({ force: true });

module.exports = Category;
