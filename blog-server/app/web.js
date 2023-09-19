const generateApp = require('./app')
const { webServiceMount } = require("../services");
const allowCORS = ['121.41.91.118', 'http://lovcc.cn', 'http://127.0.0.1:10000', 'http://localhost:10000']
generateApp(3000, webServiceMount, allowCORS)