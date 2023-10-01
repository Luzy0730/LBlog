const Joi = require('joi');

const id = Joi.number().required()
const is_enable = Joi.number().required().valid(0, 1)
const pageNum = Joi.number().required()
const pageSize = Joi.number().required()
const name = Joi.string().required()
const color = Joi.string().required()
const icon = Joi.string().required()

module.exports = {
  queryCategories: (req, res, next) => {
    const schema = Joi.object({ pageNum, pageSize }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  createCategory: (req, res, next) => {
    const schema = Joi.object({ name, color, icon }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateCategory: (req, res, next) => {
    const schema = Joi.object({ id, name, color, icon }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteCategory: (req, res, next) => {
    const schema = Joi.object({ id }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  enableCategory: (req, res, next) => {
    const schema = Joi.object({ id, is_enable }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  }
}