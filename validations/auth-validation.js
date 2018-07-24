const Joi = require('joi');

module.exports = {
  createProfile: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(50).required(),
      displayName: Joi.string().min(2).max(30).required(),
    }
  }
};
