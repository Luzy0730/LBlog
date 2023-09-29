const jwt = require('jwt-simple');
const { queryUsersMain } = require('../controls/main/user')
const jwtSecret = 'blog'

module.exports = { validateToken, jwt: jwtFn() }
// 创建校验中间件函数
async function validateToken(req, res, next) {
  // 在函数中进行校验逻辑
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7); // 去掉 Bearer 后的空格，剩下的部分就是访问令牌
    const { id, username } = jwt.decode(token, jwtSecret)
    const userInfo = (await queryUsersMain({
      where: { id, username }
    }))[0]
    if (userInfo) {
      req.body['USER_INFO'] = userInfo
      next();
    } else {
      res.customSend(null, 401, "未经授权的访问");
    }
  } else {
    res.customSend(null, 401, "未经授权的访问");
  }
};

function jwtFn() {
  return {
    encode: (payload) => jwt.encode(payload, jwtSecret),
    decode: (payload) => jwt.decode(payload, jwtSecret)
  }
}