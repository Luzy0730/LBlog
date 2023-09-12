const mysql = require("../mysql");
module.exports = {
  queryTags: (req, res) => {
    mysql(
      "SELECT id,name,color,is_enable FROM `tag` WHERE `is_delete`='0'",
      [],
      (data) => {
        res.send(data);
      }
    );
  },
  createTag: (req, res) => {
    const { name, color } = req.body;
    mysql(
      "INSERT INTO `tag` (`name`, `color`) VALUES (?, ?)",
      [name, color],
      (data) => {
        res.send(data);
      }
    );
  },
  deleteTag: (req, res) => {
    const { id } = req.body;
    mysql("UPDATE `tag` SET `is_delete` = '1' WHERE `id` = ?", [id], (data) => {
      res.send(data);
    });
  },
  updateTag: (req, res) => {
    const { id, name, color } = req.body;
    mysql(
      "UPDATE `tag` SET `name` = ?, `color` = ? WHERE `id` = ?",
      [name, color, id],
      (data) => {
        res.send(data);
      }
    );
  },
  enableTag: (req, res) => {
    const { id, is_enable } = req.body;
    mysql(
      "UPDATE `tag` SET `is_enable` = ?  WHERE `id` = ?",
      [is_enable, id],
      (data) => {
        res.send(data);
      }
    );
  },
};
