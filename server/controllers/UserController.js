import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDb from '../models/userDb';
import { error, success } from '../helpers/helpers';
import pool from '../db';

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

  static createUser(request, response) {
    const {
      firstname, lastname, othername, email, phonenumber, password, passportUrl, isAdmin,
    } = request.body;

    const userSql = 'SELECT * FROM users WHERE email = $1';

    pool.query(userSql, [email], (err, result) => {
      if (err) {
        return error(response, 500, '500', 'error in connecting to database');
      }

      if (result.rowCount > 0) {
        return error(response, 409, '409', 'email already exist');
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const insertUser = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

      const insertValues = [firstname, lastname, othername, email, phonenumber, hashPassword,
        passportUrl, isAdmin];

      pool.query(insertUser, insertValues, (fail) => {
        if (fail) {
          return error(response, 500, '500', 'error in creating account');
        }

        return success(response, 201, '201', {
          message: 'your account has been created',
          firstname,
          lastname,
          othername,
          email,
          phonenumber,
          password,
          passportUrl,
          isAdmin,
        });
      });
      return null;
    });
  }
}

export default UserController;
