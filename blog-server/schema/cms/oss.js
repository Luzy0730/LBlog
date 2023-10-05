const Joi = require('joi');

const oss = Joi.string().allow('')
const prefix = Joi.string().allow('')
const delimiter = Joi.string().required()
const maxKeys = Joi.number().required()
const name = Joi.string().required()

module.exports = {
  updateOSS: (req, res, next) => {
    const schema = Joi.object({ oss }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  queryOSSList: (req, res, next) => {
    const schema = Joi.object({ prefix, delimiter, maxKeys }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  downloadOSSFile: (req, res, next) => {
    const schema = Joi.object({ name }).unknown()
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteOSS: (req, res, next) => {
    const schema =
      Joi.object({ name, prefix })
        .without('name', 'prefix')
        .without('prefix', 'name')
        .unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  uploadOSS: (req, res, next) => {
    const schema = Joi.object({
      file: Joi.binary().required(),
      name: Joi.string().required()
    }).unknown()
    const { error } = schema.validate({ file: req.file.buffer, name: req.body.name });
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
}