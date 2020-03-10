const Joi = require("@hapi/joi");

function validateUser(user) {
  const scheme = Joi.object({
    userName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
    name: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return scheme.validate(user);
}

function validateCheckUserExist(user) {
  const scheme = Joi.object({
    userName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required()
  });
  return scheme.validate(user);
}

function validateUpdateProfile(profileData) {
  const scheme = Joi.object({
    userId: Joi.objectId().required(),
    firstName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
    bio: Joi.string()
      .min(10)
      .max(255)
      .trim()
      .required()
  });
  return scheme.validate(profileData);
}

function validateResetPassword(password) {
  const scheme = Joi.object({
    userId: Joi.objectId().required(),
    oldPassword: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    newPasword: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return scheme.validate(password);
}

function validateLogin(user) {
  const scheme = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return scheme.validate(user);
}

module.exports.validateUser = validateUser;
module.exports.validateUpdateProfile = validateUpdateProfile;
module.exports.validateCheckUserExist = validateCheckUserExist;
module.exports.validateResetPassword = validateResetPassword;
module.exports.validateLogin = validateLogin;
