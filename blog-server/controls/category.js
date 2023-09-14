const mysql = require("../mysql");

module.exports = {
  // 新建文章
  createCategory: (req, res) => {
    const { name, color, icon } = req.body;
    mysql
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
  // 查询文章
  queryCategories: (req, res) => {
    mysql
      .query({
        sql: "SELECT id,name,color,icon, is_enable FROM `category` WHERE `is_delete`='0'",
      })
      .then((data) => {
        res.customSend(data);
      });
  },
  // 更新文章
  updateCategory: (req, res) => {
    const { id, name, color, icon } = req.body;
    mysql.query({
      sql: "UPDATE `category` SET `name` = ?, `color` = ?, `icon` = ? WHERE `id` = ?",
      params:
        [name, color, icon, id],
    }).then((data) => {
      res.customSend(data);
    })
  },
  // 启用文章
  enableCategory: (req, res) => {
    const { id, is_enable } = req.body;
    mysql.query({
      sql:
        "UPDATE `category` SET `is_enable` = ?  WHERE `id` = ?",
      params:
        [is_enable, id],
    }).then((data) => {
      res.customSend(data);
    })
  },
  // 删除文章
  deleteCategory: (req, res) => {
    const { id } = req.body;
    mysql.query({
      sql:
        "UPDATE `category` SET `is_delete` = '1' WHERE `id` = ?",
      params:
        [id],
    }).then(data => {
      res.customSend(data);
    })
  },
};
