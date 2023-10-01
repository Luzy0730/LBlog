const Joi = require('joi');

const id = Joi.number().required()
const name = Joi.string().required()
const color = Joi.string().required()
const is_enable = Joi.number().required().valid(0, 1)
const pageNum = Joi.number().required()
const pageSize = Joi.number().required()

module.exports = {
  queryTags: (req, res, next) => {
    const schema = Joi.object({ pageNum, pageSize }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  createTag: (req, res, next) => {
    const schema = Joi.object({ name, color }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteTag: (req, res, next) => {
    const schema = Joi.object({ id }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateTag: (req, res, next) => {
    const schema = Joi.object({ id, name, color }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  enableTag: (req, res, next) => {
    const schema = Joi.object({ id, is_enable }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
}