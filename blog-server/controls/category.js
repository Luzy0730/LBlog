const mysqlPool = require("../mysql");

module.exports = {
  // 新建分类
  createCategory: (req, res) => {
    const { name, color, icon } = req.body;
    mysqlPool
      .query({
        sql: "INSERT INTO `category` (`name`, `color`,`icon`) VALUES (?, ?, ?)",
        params: [name, color, icon],
      })
      .then(() => {
        (data) => {
          res.customSend(data);
        };
      });
  },
  // 查询分类
  queryCategory: (req, res) => {
    mysqlPool
      .query({
        sql: "SELECT id,name,color,icon, is_enable FROM `category` WHERE `is_delete`='0'",
      })
      .then((data) => {
        res.customSend(data);
      });
  },
  // 查询分类(简略)
  queryCategorySimple: (req, res) => {
    mysqlPool
    .query({
      sql: "SELECT id,name FROM `category` WHERE `is_delete`='0' AND `is_enable` = '1'",
    })
    .then((data) => {
      res.customSend(data);
    });
  },
  // 更新分类
  updateCategory: (req, res) => {
    const { id, name, color, icon } = req.body;
    mysqlPool.query({
      sql: "UPDATE `category` SET `name` = ?, `color` = ?, `icon` = ? WHERE `id` = ?",
      params:
        [name, color, icon, id],
    }).then((data) => {
      res.customSend(data);
    })
  },
  // 启用分类
  enableCategory: (req, res) => {
    const { id, is_enable } = req.body;
    mysqlPool.query({
      sql:
        "UPDATE `category` SET `is_enable` = ?  WHERE `id` = ?",
      params:
        [is_enable, id],
    }).then((data) => {
      res.customSend(data);
    })
  },
  // 删除分类
  deleteCategory: (req, res) => {
    const { id } = req.body;
    mysqlPool.query({
      sql:
        "UPDATE `category` SET `is_delete` = '1' WHERE `id` = ?",
      params:
        [id],
    }).then(data => {
      res.customSend(data);
    })
  },
};
