const generateApp = require('./app')
const { webServiceMount } = require("../services");
generateApp(3000, webServiceMount)