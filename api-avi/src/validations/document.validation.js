const Joi = require('joi');
const { objectId, transferability_data } = require('./custom.validation');

const createDocument = {
    body: Joi.object().keys({
        user: Joi.string().custom(objectId).required(),
        hairstyle: Joi.string().custom(objectId),
        picture: Joi.string(),
    }),
};

const getAllDocuments = {
    query: Joi.object().keys({
        user: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getDocument = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

const updateDocument = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            user: Joi.string().custom(objectId),
        hairstyle: Joi.string().custom(objectId),
        picture: Joi.string()
        })
        .min(0),
};

const deleteDocument = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
};