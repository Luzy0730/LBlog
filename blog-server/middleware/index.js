const { customSend, customLimitSend } = require('./intercept')
const { validateToken, jwt } = require('./validate')

function middleware(app) {
  app.use(customSend)
  app.use(customLimitSend)
  app.locals.validateToken = validateToken;
  app.locals.jwt = jwt;
}

// 自定义封装的中间件函数
module.exports = middleware;