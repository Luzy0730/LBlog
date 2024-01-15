//导入express
const express = require('express');
const cors = require('cors');
const createRouter = require('../router/index');
const createRetHandler = require('./retHandler');
const errHandler = require('./errHandler');

const app = express();

app.use(cors());

// 配置解析post参数
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

createRetHandler(app);
createRouter(app);

app.on('error', errHandler);

module.exports = app;
