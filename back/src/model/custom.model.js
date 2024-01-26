const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');
const Custom = seq.define(
  'custom',
  {
    aboutAudio: {
      field: 'about_audio',
      type: DataTypes.STRING(512),
      comment: '关于我_播放器',
    },
    aboutContent: {
      field: 'about_content',
      type: DataTypes.TEXT,
      comment: '关于我_文章',
    },
    banner: {
      type: DataTypes.STRING(512),
      comment: '首页轮播',
    },
    siteInfo: {
      field: 'site_info',
      type: DataTypes.TEXT,
      comment: '站点信息',
    },
    introduction: {
      type: DataTypes.TEXT,
      comment: '个人介绍',
    },
    oss: {
      type: DataTypes.STRING(512),
      comment: 'oss配置',
    },
  },
  {
    timestamps: false,
  }
);

//   await Custom.sync({ force: true });

module.exports = Custom;
