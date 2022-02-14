const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        gender: Joi.string().required(),
        phone: Joi.number().required(),
        role: Joi.string().default("user")
    }),
};
const confirmEmail={
    body:Joi.object().keys({
        emailVerificationToken:Joi.string().required(),
    })
}

const resendOtp={
    body:Joi.object().keys({
        email:Joi.string().required(),
    })
}

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

const resetPassword = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
    }),
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    resendOtp,
    confirmEmail
};