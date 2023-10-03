import Joi, { ObjectSchema } from 'joi';

const permissionsSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(16).messages({
    'string.base': 'Role must be of type string',
    'string.min': 'Number of character must be greater than 3',
    'string.max': 'Number of character must be less than 16',
    'string.empty': 'Role name is a required field'
  }),
  description: Joi.string().optional().min(50).max(250).messages({
    'string.base': 'Description must be of type string',
    'string.min': 'Number of character must be greater than 50',
    'string.max': 'Number of character must be less than 250',
  }),
});


export { permissionsSchema };
