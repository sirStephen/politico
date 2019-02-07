import { error } from '../../helpers/helpers';

class UserValidation {
  static isSignUpValid(request, response, next) {
    const {
      firstname, lastname, othername, email, phonenumber, password,
    } = request.body;

    let isEmailValid = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/g;

    isEmailValid = isEmailValid.test(String(email).toLowerCase());


    if (firstname === '' || !firstname) {
      return error(response, 400, '400', 'Sorry, firstname name is required');
    }

    if (lastname === '' || !lastname) {
      return error(response, 400, '400', 'Sorry, lastname is required');
    }

    if (othername === '' || !othername) {
      return error(response, 400, '400', 'Sorry, othername is required');
    }

    if (isEmailValid === '' || !isEmailValid) {
      return error(response, 400, '400', 'Sorry, invalid email');
    }

    if (phonenumber === '' || !phonenumber) {
      return error(response, 400, '400', 'Sorry, phonenumber is required');
    }

    if (password === '' || !password) {
      return error(response, 400, '400', 'Sorry, password is required');
    }

    if (typeof firstname !== 'string') {
      return error(response, 400, '400', 'Sorry,first name must be a string');
    }

    if (typeof lastname !== 'string') {
      return error(response, 400, '400', 'Sorry,last name must be a string');
    }

    if (typeof othername !== 'string') {
      return error(response, 400, '400', 'Sorry,other name must be a string');
    }

    if (typeof phonenumber !== 'number') {
      return error(response, 400, '400', 'Sorry, phonenumber must be a number');
    }

    if (password.length <= 6) {
      return error(response, 400, '400', 'Sorry, password length should be at least 6 characters');
    }

    next();

    return null;
  }

  static isLoginValid(request, response, next) {
    const { email, password } = request.body;

    let isEmailValid = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/g;

    isEmailValid = isEmailValid.test(String(email).toLowerCase());

    if (isEmailValid === '' || !isEmailValid) {
      return error(response, 400, '400', 'Sorry, invalid email');
    }

    if (password === '' || !password) {
      return error(response, 400, '400', 'Sorry, password is required');
    }

    next();

    return null;
  }
}

export default UserValidation;
