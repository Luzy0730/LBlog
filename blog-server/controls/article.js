const mysql = require("../mysql");
module.exports = {
  // 文章标签
  getTags: (req, res) => {
    mysql(
      "SELECT id,name,color,is_enable FROM `article_tag` WHERE `is_delete`='0'",
      [],
      (data) => {
        res.send(data);
      }
    );
  },
  addTag: (req, res) => {
    const { name, color } = req.body;
    mysql(
      "INSERT INTO `article_tag` (`name`, `color`) VALUES (?, ?)",
      [name, color],
      (data) => {
        res.send(data);
      }
    );
  },
  removeTag: (req, res) => {
    const { id } = req.body;
    mysql(
      "UPDATE `article_tag` SET `is_delete` = '1' WHERE `id` = ?",
      [id],
      (data) => {
        res.send(data);
      }
    );
  },
  updateTag: (req, res) => {
    const { id, name, color } = req.body;
    mysql(
      "UPDATE `article_tag` SET `name` = ?, `color` = ? WHERE `id` = ?",
      [name, color, id],
      (data) => {
        res.send(data);
      }
    );
  },
  enableTag: (req, res) => {
    const { id, is_enable } = req.body;
    mysql(
      "UPDATE `article_tag` SET `is_enable` = ?  WHERE `id` = ?",
      [is_enable, id],
      (data) => {
        res.send(data);
      }
    );
  },
  // 文章分类
  addCategory: (req, res) => {
    const { name, color, icon } = req.body;
    mysql(
      "INSERT INTO `article_category` (`name`, `color`,`icon`) VALUES (?, ?, ?)",
      [name, color, icon],
      (data) => {
        res.send(data);
      }
    );
  },
  getCategories: (req, res) => {
    mysql(
      "SELECT id,name,color,icon, is_enable FROM `article_category` WHERE `is_delete`='0'",
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
      sql = "UPDATE `article_category` SET `is_enable` = ?  WHERE `id` = ?";
      params = [is_enable, id];
    } else {
      sql =
        "UPDATE `article_category` SET `name` = ?, `color` = ?, `icon` = ? WHERE `id` = ?";
      params = [name, color, icon, id];
    }
    mysql(sql, params, (data) => {
      res.send(data);
    });
  },
  removeCategory: (req, res) => {
    const { id } = req.body;
    mysql(
      "UPDATE `article_category` SET `is_delete` = '1' WHERE `id` = ?",
      [id],
      (data) => {
        res.send(data);
      }
    );
  },
};
