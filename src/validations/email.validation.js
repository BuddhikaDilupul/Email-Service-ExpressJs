const Joi = require("joi");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
module.exports = {
  reset: {
    body: Joi.object({
      _id: Joi.forbidden(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required().pattern(emailRegex),
    })
  },
  newAppointment: {
    body: Joi.object({
      _id: Joi.forbidden(),
      name: Joi.string().required(),
      date: Joi.string().required(),
      email: Joi.string().required().pattern(emailRegex),
      totalCharges: Joi.number().required(),
    }),
  },
};

