import { error } from '../../helpers/helpers';

class OfficeValidation {
  static isCreateOfficeValid(request, response, next) {
    const {
      officeName, type,
    } = request.body;

    if (officeName === '' || !officeName) {
      return error(response, 400, '400', 'Sorry, office name is required');
    }

    if (type === '' || !type) {
      return error(response, 400, '400', 'Sorry, type is required');
    }

    if (typeof officeName !== 'string') {
      return error(response, 400, '400', 'Sorry, office name must be a string');
    }

    next();

    return null;
  }
}

export default OfficeValidation;
