const { Op, Sequelize, literal } = require('sequelize');
const seq = require('../db/db_sequ');
const ArticleModel = require('../model/article.model');
const CategoryModel = require('../model/category.model');
const TagModel = require('../model/tag.model');

class ArticleService {
  async getArticleDetail({ id }) {
    const res = await ArticleModel.findOne({
      include: [{
        model: CategoryModel,
        as: 'category',
        attributes: ['id', 'name', 'color', 'icon'],
        where: { state: 1 },
        required: false
      }, {
        model: TagModel,
        attributes: ['id', 'name', 'color'],
        where: { state: 1 },
        through: { attributes: [] },
        required: false
      }],
      attributes: {
        exclude: ['categoryId'],
      },
      where: { id }
    });
    return res ? res.dataValues : null;
  }
  async createArticle({ title, categoryId, description, content, tagIds, words }) {
    const fieldOpt = { title, categoryId, description, content, words };
    const res = await ArticleModel.create(fieldOpt);
    tagIds && await res.addTags(tagIds)
    return res ? res.dataValues : null;
  }

  async updateArticle({ id, title, categoryId, description, content, tagIds, words, state }) {
    const fieldOpt = { title, categoryId, description, content, words };
    state !== undefined && Object.assign(fieldOpt, { state });
    const ret = await seq.transaction(async (transaction) => {
      try {
        const res = await ArticleModel.update(fieldOpt, { where: { id }, transaction });
        if (tagIds) {
          const article = await ArticleModel.findOne({ where: { id }, transaction });
          const articleTags = await article.getTags({ transaction });
          const _tagIds = articleTags.map(tag => tag.dataValues.id);
          await article.removeTags(_tagIds, { transaction })
          await article.setTags(tagIds, { transaction })
        }
        return res ? res[0] : null;
      } catch (error) {
        await transaction.rollback();
        throw error
      }
    })
    return ret;
  }

  async deleteArticle(option) {
    const { id } = option;
    const ret = await seq.transaction(async (transaction) => {
      try {
        const article = await ArticleModel.findOne({ where: { id }, transaction });
        const articleTags = await article.getTags({ transaction });
        const tagIds = articleTags.map(tag => tag.dataValues.id);
        await article.removeTags(tagIds, { transaction })
        const res = await ArticleModel.destroy({ where: { id }, transaction });
        return res
      } catch (error) {
        await transaction.rollback();
        throw error
      }
    })
    return ret;
  }

  async getArticleList({ page, pageSize, title, categoryId, state, tagId, keyword }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = {};
    const order = []
    title && Object.assign(where, { title: { [Op.like]: `%${title}%` } });
    state && Object.assign(where, { state });
    categoryId && Object.assign(where, { categoryId });
    if (tagId) {
      const tag = await TagModel.findByPk(tagId)
      const articles = await tag.getArticles()
      const ids = articles.map(article => article.id)
      Object.assign(where, { id: { [Op.in]: ids } });
    }
    if (keyword) {
      Object.assign(where, {
        [Op.or]: [
          { title: { [Op.regexp]: keyword } },
          { description: { [Op.regexp]: keyword } },
          { content: { [Op.regexp]: keyword } },
        ]
      })
      order.push([Sequelize.literal('(CASE \
        WHEN title REGEXP :keyword THEN 100 \
        WHEN description REGEXP :keyword THEN 30 \
        WHEN content REGEXP :keyword THEN 5 \
        ELSE 0 \
      END) DESC')]) // 按照高分降序排序)
    }
    const totalCount = await ArticleModel.count({ where });
    const articles = await ArticleModel.findAll({
      include: [{
        model: CategoryModel,
        as: 'category',
        attributes: ['id', 'name', 'color', 'icon'],
        where: { state: 1 },
        required: false
      }, {
        model: TagModel,
        attributes: ['id', 'name', 'color'],
        where: { state: 1, },
        through: { attributes: [] },
        required: false
      }],
      attributes: {
        exclude: ['categoryId', 'content'],
      },
      where,
      offset,
      limit,
    });
    return {
      total: totalCount,
      data: articles,
    };
  }
}

module.exports = new ArticleService();
