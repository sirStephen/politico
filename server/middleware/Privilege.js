import jwt from 'jsonwebtoken';
import { success, error } from '../helpers/helpers';

const isAdmin = (request, response, next) => {
  try {
    const getToken = request.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(getToken);

    if (decoded.data.role !== 'admin') {
      return error(response, 401, 'you are not authorized');
    }

    next();
  } catch (err) {
    return error(response, 401, 'auth failed');
  }

  return null;
};

export default isAdmin;
