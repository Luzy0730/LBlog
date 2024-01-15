const CategoryModel = require('../model/category.model');
const { Op } = require('sequelize');

class CategoryService {
  async getCategoryInfo({ name, id }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    name && Object.assign(whereOpt, { name });
    const res = await CategoryModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }

  async createCategory({ name, color, icon }) {
    const fieldOpt = { name, color, icon };
    const res = await CategoryModel.create(fieldOpt);
    return res ? res.dataValues : null;
  }

  async deleteCategory(option) {
    const { id } = option;
    const res = await CategoryModel.destroy({ where: { id } });
    return res;
  }

  async updateCategory({ id, name, color, icon, state }) {
    const fieldOpt = {};
    name && Object.assign(fieldOpt, { name });
    color && Object.assign(fieldOpt, { color });
    icon && Object.assign(fieldOpt, { icon });
    state !== undefined && Object.assign(fieldOpt, { state });
    const res = await CategoryModel.update(fieldOpt, { where: { id } });
    return res ? res[0] : null;
  }

  async getCategoryList({ page = 1, pageSize = 10, name, state }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = {};
    name && Object.assign(where, { name: { [Op.like]: `%${name}%` } });
    state && Object.assign(where, { state });
    const { count, rows } = await CategoryModel.findAndCountAll({
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

module.exports = new CategoryService();
