const Joi = require('joi');

const oss = Joi.string().allow('')

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
}