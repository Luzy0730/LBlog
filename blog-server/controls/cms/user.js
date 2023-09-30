const mysqlPool = require("../../mysql");
const { queryUsersMain, updateUserMain } = require('../main/user')

module.exports = {
  queryUsers: async (req, res) => {
    const { pageNum, pageSize } = req.query
    queryUsersMain({
      pagination: { pageNum, pageSize },
    }).then(data => {
      res.customLimitSend(data.users, data.userTotal);
    })
  },
  // 更新用户
  updateUser: (req, res) => {
    const { id, nickname, avatar } = req.body;
    updateUserMain({
      fields: { nickname, avatar }, where: { id }
    }).then(data => {
      res.customSend(data);
    })
  },
  // 更新用户密码
  updatePassword: async (req, res) => {
    const { id, newPassword, password } = req.body;
    const connection = await mysqlPool.connect();
    const user = (await mysqlPool.query({
      sql: `SELECT id FROM user WHERE id=${id} AND password=PASSWORD('${password}')`,
      connection
    }))[0]
    if (!user) {
      mysqlPool.release(connection);
      res.customSend(null, 400, "旧密码不正确");
    } else {
      updateUserMain({
        fields: { newPassword, password }, where: { id },
        connection
      }).then(data => {
        mysqlPool.release(connection);
        res.customSend(data);
      })
    }
  },
  // 禁用/启用
  enableUser: async (req, res) => {
    const { id, isEnable } = req.body;
    updateUserMain({
      fields: { isEnable }, where: { id },
    }).then(data => {
      res.customSend(data);
    })
  },
  // 注销
  deleteUser: async (req, res) => {
    const { id } = req.body;
    updateUserMain({
      fields: { isDelete: 1 }, where: { id },
    }).then(data => {
      res.customSend(data);
    })
  },
  login: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      res.customSend(null, 400, "无效的参数");
    } else {
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
    }
  },
  validateUser: async (req, res) => {
    const { USER_INFO } = req.body
    res.customSend(USER_INFO);
  }
}