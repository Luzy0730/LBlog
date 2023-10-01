const mysqlPool = require("../../mysql");
const { queryTagsMain } = require('../main/tag')
module.exports = {
  // 查询标签
  queryTags: (req, res) => {
    const { pageNum, pageSize } = req.query
    queryTagsMain({
      pagination: { pageNum, pageSize },
      simple: false
    }).then(data => {
      res.customLimitSend(data.tags, data.tagsTotal);
    })
  },
  // 查询标签(简略)
  queryTagsSimple: (req, res) => {
    queryTagsMain({
      where: { isEnable: 1 }
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
