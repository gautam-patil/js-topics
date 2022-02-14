const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createCategory = {
    body: Joi.object().keys({
      categoryName: Joi.string().required(),
    }),
};

const getCategorys = {
    query: Joi.object().keys({
      categoryName: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getCategory = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateCategory = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        categoryName: Joi.string(),
      })
      .min(1),
  };
  
  const deleteCategory = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createCategory,
    getCategorys,
    getCategory,
    updateCategory,
    deleteCategory,
  };
  