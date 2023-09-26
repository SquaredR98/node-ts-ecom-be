import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(8).max(16).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Number of character must be greater than 8',
    'string.max': 'Number of character must be less than 16',
    'string.empty': 'Username is a required field'
  }),
  password: Joi.string().required().min(8).max(16).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Number of character must be greater than 8',
    'string.max': 'Number of character must be less than 16',
    'string.empty': 'Password is a required field'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  }),
  avatarColor: Joi.string().required().messages({
    'any.required': 'Avatar color is required'
  }),
  avatarImage: Joi.string().required().messages({
    'any.required': 'Avatar image is required'
  }),
  firstName: Joi.string().required().min(3).max(20).messages({
    'string.base': 'First name must be of type string',
    'string.min': 'First name must be greater than 3',
    'string.max': 'Frist name should not be greater than 20 characters',
    'string.empty': 'First name is required'
  }),
  lastName: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Last name must be of type string',
    'string.min': 'Last name must be greater than 3',
    'string.max': 'Last name should not be greater than 20 characters',
    'string.empty': 'Last name is required'
  }),
});

const loginSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(8).max(16).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Number of character must be greater than 8',
    'string.max': 'Number of character must be less than 16',
    'string.empty': 'Username is a required field'
  }),
  password: Joi.string().required().min(8).max(16).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Number of character must be greater than 8',
    'string.max': 'Number of character must be less than 16',
    'string.empty': 'Password is a required field'
  })
});


export { signupSchema, loginSchema };
