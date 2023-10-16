const Joi = require('joi');

const id = Joi.number().required()
const description = Joi.string().allow('')
const content = Joi.string().allow('')
const categoryId = Joi.number().required()
const tagIds = Joi.string().allow('')
const words = Joi.number().required()
const title = Joi.string().required()
const is_enable = Joi.number().required().valid(0, 1)
const pageNum = Joi.number()
const pageSize = Joi.number()

module.exports = {
  queryArticles: (req, res, next) => {
    const schema = Joi.object({ pageNum, pageSize }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  queryArticleDetail: (req, res, next) => {
    const schema = Joi.object({ id }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteArticle: (req, res, next) => {
    const schema = Joi.object({ id }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  enableArticle: (req, res, next) => {
    const schema = Joi.object({ id, is_enable }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateArticle: (req, res, next) => {
    const schema = Joi.object({
      id, description, content, categoryId, tagIds, words, title,
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  createArticle: (req, res, next) => {
    const schema = Joi.object({
      description, content, categoryId, tagIds, words, title,
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
}