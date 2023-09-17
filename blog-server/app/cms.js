const generateApp = require('./app')
const { cmsServiceMount } = require("../services");
generateApp(4000, cmsServiceMount)