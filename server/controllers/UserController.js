import jwt from 'jsonwebtoken';
import userDb from '../models/userDb';
import { error } from '../helpers/helpers';

class UserController {
  static login(request, response) {
    const { email, password } = request.body;

    userDb.forEach((user) => {
      if (email === user.email && password === user.password && user.role === 'admin') {
        if (password) {
          const token = jwt.sign({
            data: {
              id: user.id,
              email: user.email,
              role: user.role,
            },
          }, process.env.JWT_KEY, { expiresIn: '24h' });
          return response.status(200).json({
            message: 'you have successfully logged in',
            email: user.email,
            role: user.role,
            token,
          });
        }
      }

      if (email === user.email && password === user.password && user.role === 'user') {
        if (password) {
          const token = jwt.sign({
            data: {
              id: user.id,
              email: user.email,
              role: user.role,
            },
          }, process.env.JWT_KEY, { expiresIn: '24h' });
          return response.status(200).json({
            message: 'you have successfully logged in',
            email: user.email,
            role: user.role,
            token,
          });
        }
      }
      return null;
    });
    return error(response, 400, 'email address or password does not exist.');
  }
}

export default UserController;
