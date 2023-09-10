const mysql = require("../mysql");
module.exports = {
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
    const { id, name, color, is_enable } = req.body;
    let sql = "";
    let params = [];
    if (is_enable) {
      sql = "UPDATE `article_tag` SET `is_enable` = ?  WHERE `id` = ?";
      params = [is_enable, id];
    } else {
      sql = "UPDATE `article_tag` SET `name` = ?, `color` = ? WHERE `id` = ?";
      params = [name, color, id];
    }
    mysql(sql, params, (data) => {
      res.send(data);
    });
  },
};
