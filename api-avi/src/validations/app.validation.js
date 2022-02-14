const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createApp = {
    body: Joi.object().keys({
        appName: Joi.string(),
        description: Joi.string().required(),
        status: Joi.string().default("active"),
        icon:Joi.string(),
        playstoreLink: Joi.string(),
        appstoreLink: Joi.string(),
    }),
};

const getApps = {
    query: Joi.object().keys({
    status: Joi.string().valid("active","inactive"),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getApp = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateApp = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        appName: Joi.string(),
        description: Joi.string(),
        status: Joi.string().default("active"),
        icon:Joi.string(),
        playstoreLink: Joi.string(),
        appstoreLink: Joi.string(),
      })
      .min(1),
  };
  
  const deleteApp = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createApp,
    getApps,
    getApp,
    updateApp,
    deleteApp,
  };
  