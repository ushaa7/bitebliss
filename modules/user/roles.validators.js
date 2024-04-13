const Joi = require('joi');

module.exports = {
  get: {
    params: Joi.object({
      id: Joi.string()
    })
  },
  add: {
    payload: Joi.object({
      role : Joi.string(),
      permissions: Joi.array().items(Joi.string())
    })
  },
  list: {
  },
  delete: {
    params: Joi.object({
      id: Joi.string()
    })
  },
  addPermissions: {
    params: Joi.object({
      id: Joi.string()
    }),
    payload: Joi.object({
      permissions: Joi.array().items(Joi.string())
    })
  },
  removePermissions: {
    params: Joi.object({
      id: Joi.string()
    }),
    payload: Joi.object({
      permissions: Joi.string()
    })
  },
  getPermissions: {
    params: Joi.object({
      name: Joi.string()
    })
  }
};
