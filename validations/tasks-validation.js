const Joi = require('joi');

module.exports = {
  createTask: {
    body: {
      title: Joi.string().min(1).max(100).required(),
      description: Joi.string().max(3000)
    }
  },
  updateTask: {
    body: {
      title: Joi.string().min(1).max(100),
      description: Joi.string().max(3000),
      completed: Joi.boolean()
    }
  }
};
