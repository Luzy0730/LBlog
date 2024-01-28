const { DataTypes } = require('sequelize');
const CategoryModel = require('./category.model');
const TagModel = require('./tag.model');
const seq = require('../db/db_sequ');

const Article = seq.define(
  'article',
  {
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: '标题'
    },
    categoryId: {
      field: 'category_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '分类id'
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      comment: '描述'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '内容'
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '阅览数'
    },
    words: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '字数'
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


Article.belongsTo(CategoryModel, { foreignKey: 'categoryId', as: 'category' })

Article.belongsToMany(TagModel, { through: 'article_tag' });
TagModel.belongsToMany(Article, { through: 'article_tag' });
// Article.sync({ force: true });

module.exports = Article;
