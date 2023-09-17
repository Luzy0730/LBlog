const mysqlPool = require("../../mysql");
module.exports = {
  // 查询标签
  queryTags: (req, res) => {
    mysqlPool.query({
      sql: "SELECT id,name,color,is_enable FROM `tag` WHERE `is_delete`='0'",
    }).then(data => {
      res.customSend(data);
    })
  },
  // 查询标签(简略)
  queryTagsSimple: (req, res) => {
    mysqlPool.query({
      sql: "SELECT id,name FROM `tag` WHERE `is_delete`='0' AND `is_enable`=1",
    }).then(data => {
      res.customSend(data);
    })
  },
  // 新增标签
  createTag: (req, res) => {
    const { name, color } = req.body;
    mysqlPool.query({
      sql:
        "INSERT INTO `tag` (`name`, `color`) VALUES (?, ?)",
      params: [name, color],
    }).then(data => {
      res.customSend(data);
    })
  },
  // 删除标签
  deleteTag: (req, res) => {
    const { id } = req.body;
    mysqlPool.query({
      sql: "UPDATE `tag` SET `is_delete` = '1' WHERE `id` = ?",
      params: [id]
    }).then(data => {
      res.customSend(data);
    })
  },
  // 更新标签
  updateTag: (req, res) => {
    const { id, name, color } = req.body;
    mysqlPool.query({
      sql:
        "UPDATE `tag` SET `name` = ?, `color` = ? WHERE `id` = ?",
      params: [name, color, id],
    }).then(data => {
      res.customSend(data);
    })
  },
  enableTag: (req, res) => {
    const { id, is_enable } = req.body;
    mysqlPool.query({
      sql:
        "UPDATE `tag` SET `is_enable` = ?  WHERE `id` = ?",
      params: [is_enable, id],
    }).then(data => {
      res.customSend(data);
    })
  },
};
