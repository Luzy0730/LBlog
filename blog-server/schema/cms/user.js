const Joi = require('joi');
module.exports = {
  queryUsers: (req, res, next) => {
    const schema = Joi.object({
      pageNum: Joi.number().required().min(1),
      pageSize: Joi.number().required().min(1)
    })
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateUser: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      nickname: Joi.string().required(),
      avatar: Joi.string().required()
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updatePassword: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      newPassword: Joi.string().required(),
      password: Joi.string().required()
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  enableUser: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      isEnable: Joi.number().valid(0, 1).required(),
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteUser: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  }
}

