import * as express from 'express';
import { Request, Response } from 'express';

import { validateAuth } from '../validation';
import { UserService } from '../services';

const services = new UserService();

class Auth {
  public path = '/api/auth';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
  }

  private addUser = async (req: Request, res: Response) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (!user) return res.status(400).send('Invalid email and/or password');

    const validPassword = await services.validatePassword(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid email and/or password');

    const token = await services.getToken(user.user_id);
    res.send(token);
  };
}

export default Auth;
