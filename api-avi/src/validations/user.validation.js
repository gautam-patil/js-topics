const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        gender: Joi.string().required(),
        phone: Joi.number().required(),
        role: Joi.string().required().valid("user","admin")
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
        password: Joi.string().custom(password),
        currentPassword: Joi.string().custom(password),
        first_name: Joi.string(),
        last_name: Joi.string(),
        profile:Joi.string(),
        gender: Joi.string(),
        phone: Joi.number(), 
      role: Joi.string().valid("user","admin")
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
