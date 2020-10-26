import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UserProps } from '../types';
import { JWT_KEY } from '../constants';

const prisma = new PrismaClient();

export default class UserService {
  public async findUser(user_params: UserProps) {
    let user = await prisma.user.findOne({
      where: { email_address: user_params.email_address },
    });
    return user;
  }

  public async findUserById(id: number) {
    let user = await prisma.user.findOne({ where: { user_id: id } });
    return user;
  }

  public async createUser(user_params: UserProps) {
    const salt = await bcrypt.genSalt(10);
    user_params.password = await bcrypt.hash(user_params.password, salt);
    let user = await prisma.user.create({
      data: {
        company_id: user_params.company_id,
        user_unique_reference: user_params.user_unique_reference,
        hustle_name: user_params.hustle_name,
        fistname: user_params.firstname,
        middlename: user_params.middlename,
        lastname: user_params.lastname,
        date_of_birth: new Date(user_params.date_of_birth),
        mobile_number: user_params.mobile_number,
        gender: user_params.gender,
        email_address: user_params.email_address,
        pin_code: user_params.pin_code,
        ip_address: user_params.ip_address,
        verified: 'false',
        password: user_params.password,
        date_created: new Date(user_params.date_created),
      },
    });
    return _.pick(user, ['user_id', 'firstname', 'lastname', 'email_address']);
  }

  public async validatePassword(reqPassword: string, userPassword: string) {
    const validPassword = await bcrypt.compare(reqPassword, userPassword);
    if (!validPassword) return false;
    return true;
  }

  public async getToken(id: number | undefined) {
    const token = jwt.sign({ user_id: id }, JWT_KEY);
    return token.toString();
  }
}
