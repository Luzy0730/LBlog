const Joi = require('joi');

const aboutAudio = Joi.string().allow('')
const aboutContent = Joi.string().allow('')
const banner = Joi.string().allow('')
const siteInfo = Joi.string().allow('')
const introduction = Joi.string().allow('')

module.exports = {
  updateAbout: (req, res, next) => {
    const schema = Joi.object({ aboutAudio, aboutContent }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateBanner: (req, res, next) => {
    const schema = Joi.object({ banner }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateSiteInfo: (req, res, next) => {
    const schema = Joi.object({ siteInfo }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateIntroduction: (req, res, next) => {
    const schema = Joi.object({ introduction }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
}
