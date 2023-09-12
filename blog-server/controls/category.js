const mysql = require("../mysql");

module.exports = {
  // 文章分类
  createCategory: (req, res) => {
    const { name, color, icon } = req.body;
    mysql(
      "INSERT INTO `category` (`name`, `color`,`icon`) VALUES (?, ?, ?)",
      [name, color, icon],
      (data) => {
        res.send(data);
      }
    );
  },
  queryCategories: (req, res) => {
    mysql(
      "SELECT id,name,color,icon, is_enable FROM `category` WHERE `is_delete`='0'",
      [],
      (data) => {
        res.send(data);
      }
    );
  },
  updateCategory: (req, res) => {
    const { id, name, color, icon, is_enable } = req.body;
    let sql = "";
    let params = [];
    if (is_enable) {
      sql = "UPDATE `category` SET `is_enable` = ?  WHERE `id` = ?";
      params = [is_enable, id];
    } else {
      sql =
        "UPDATE `category` SET `name` = ?, `color` = ?, `icon` = ? WHERE `id` = ?";
      params = [name, color, icon, id];
    }
    mysql(sql, params, (data) => {
      res.send(data);
    });
  },
  deleteCategory: (req, res) => {
    const { id } = req.body;
    mysql(
      "UPDATE `category` SET `is_delete` = '1' WHERE `id` = ?",
      [id],
      (data) => {
        res.send(data);
      }
    );
  },
};
