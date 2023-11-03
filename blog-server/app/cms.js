const generateApp = require('./app')
const { cmsServiceMount } = require("../services");
const allowCORS = ['http://www.guaiguaizhanhao.cn:7777', 'http://guaiguaizhanhao.cn:7777', 'http://127.0.0.1:9999', 'http://localhost:9999']
generateApp(4000, cmsServiceMount, allowCORS)
