const mysqlPool = require("../../mysql");
const { queryUsersMain } = require('../main/user')

module.exports = {
  queryUsers: async (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query
    queryUsersMain({
      pagination: { pageNum, pageSize },
    }).then(data => {
      res.customLimitSend(data.users, data.userTotal);
    })
  },
  login: async (req, res) => {
    const { username = "", password = "" } = req.body
    const user = (await queryUsersMain({
      where: { username, password }
    }))[0]
    if (user) {
      res.customSend({
        userInfo: user,
        token: res.app.locals.jwt.encode({ id: user.id, username: user.username })
      });
    } else {
      res.customSend(null, 403, "用户名或密码错误");
    }
  },
  validateUser: async (req, res) => {
    const { USER_INFO } = req.body
    res.customSend(USER_INFO);
  }
}