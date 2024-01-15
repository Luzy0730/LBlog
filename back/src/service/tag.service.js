const TagModel = require('../model/tag.model');
const seq = require('../db/db_sequ');
const { Op } = require('sequelize');

class TagService {
  async getTagInfo({ name, id }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    name && Object.assign(whereOpt, { name });
    const res = await TagModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }

  async createTag({ name, color }) {
    const fieldOpt = { name, color };
    const res = await TagModel.create(fieldOpt);
    return res ? res.dataValues : null;
  }

  async deleteTag(option) {
    const { id } = option;
    const ret = await seq.transaction(async (transaction) => {
      try {
        const tag = await TagModel.findOne({ where: { id }, transaction });
        const tagArticles = await tag.getArticles({ transaction });
        const artilceIds = tagArticles.map(article => article.dataValues.id);
        await tag.removeArticles(artilceIds, { transaction })
        const res = await TagModel.destroy({ where: { id }, transaction });
        return res
      } catch (error) {
        await transaction.rollback();
        throw error
      }
    })
    return ret;
  }

  async updateTag({ id, name, color, state }) {
    const fieldOpt = {};
    name && Object.assign(fieldOpt, { name });
    color && Object.assign(fieldOpt, { color });
    state !== undefined && Object.assign(fieldOpt, { state });
    const res = await TagModel.update(fieldOpt, { where: { id } });
    return res ? res[0] : null;
  }

  async getTagList({ page = 1, pageSize = 10, name, state }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = {};
    name && Object.assign(where, { name: { [Op.like]: `%${name}%` } });
    state && Object.assign(where, { state });
    const { count, rows } = await TagModel.findAndCountAll({
      where,
      offset,
      limit,
    });
    return {
      total: count,
      data: rows,
    };
  }
}

module.exports = new TagService();
