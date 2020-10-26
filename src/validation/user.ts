import Joi from 'joi';

import { UserProps } from 'src/types';

const validateUser = (user: UserProps) => {
  const schema = Joi.object({
    company_id: Joi.number().required(),
    user_unique_reference: Joi.string().min(3).max(45).required(),
    hustle_name: Joi.string().min(3).max(45).required(),
    firstname: Joi.string().min(3).max(45),
    middlename: Joi.string().min(3).max(45),
    lastname: Joi.string().min(3).max(45).required(),
    date_of_birth: Joi.required(),
    mobile_number: Joi.string().min(3).max(45).required(),
    gender: Joi.string().min(3).max(45).required(),
    email_address: Joi.string().email().min(3).max(45).required(),
    pin_code: Joi.string().min(3).max(45).required(),
    ip_address: Joi.string().min(3).max(45).required(),
    verified: Joi.string().min(3).max(45),
    date_created: Joi.required(),
    password: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(user);
};

interface LoginProps {
  email_address: string;
  password: string;
}

export const validateAuth = (credential: LoginProps) => {
  const schema = Joi.object({
    email_address: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(credential);
};

export default validateUser;
