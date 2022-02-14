const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createModel = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        picture:Joi.string().required(),
        category:Joi.array(),
    }),
};

const getModels = {
    query: Joi.object().keys({
      name: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getModel = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateModel = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
          name: Joi.string(),
          picture:Joi.string(),
          category:Joi.array(),
      })
      .min(1),
  };
  
  const deleteModel = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createModel,
    getModels,
    getModel,
    updateModel,
    deleteModel,
  };
  