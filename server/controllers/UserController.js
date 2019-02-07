import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error, success } from '../helpers/helpers';
import pool from '../db';

class UserController {
  static login(request, response) {
    const { email, password } = request.body;

    const selectUser = 'SELECT * FROM users WHERE email = $1';

    pool.query(selectUser, [email], (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result.rowCount > 0) {
        // Load hash from your password DB.
        const isPassword = bcrypt.compareSync(password, result.rows[0].password);
        if (!isPassword) {
          return error(response, 400, '400', 'Invalid password');
        }

        if (isPassword) {
          const token = jwt.sign({
            data: {
              id: result.rows[0].id,
              role: result.rows[0].role,
            },
          }, process.env.JWT_KEY, { expiresIn: '24h' });
          return success(response, 200, '200', {
            message: 'you have successfully logged in',
            email: result.rows[0].email,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
            role: result.rows[0].role,
            token,
          });
        }
      }
      return error(response, 404, '404', 'email address or password does not exist.');
    });
  }

  static createUser(request, response) {
    const {
      firstname, lastname, othername, email, phonenumber, password, passportUrl,
    } = request.body;

    const role = 'user';

    const userSql = 'SELECT * FROM users WHERE email = $1';

    pool.query(userSql, [email], (err, result) => {
      if (err) {
        return error(response, 500, '500', 'error in connecting to database');
      }

      if (result.rowCount > 0) {
        return error(response, 409, '409', 'email already exist');
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const insertUser = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

      const insertValues = [firstname, lastname, othername, email, phonenumber, hashPassword,
        passportUrl, role];

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
          passportUrl,
          role,
        });
      });
      return null;
    });
  }
}

export default UserController;
