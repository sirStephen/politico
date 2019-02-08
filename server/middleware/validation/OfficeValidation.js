import { error } from '../../helpers/helpers';

class OfficeValidation {
  static isCreateOfficeValid(request, response, next) {
    const {
      officename, type,
    } = request.body;

    if (officename === '' || !officename) {
      return error(response, 400, '400', 'Sorry, office name is required');
    }

    if (type === '' || !type) {
      return error(response, 400, '400', 'Sorry, type is required');
    }

    if (typeof officename !== 'string') {
      return error(response, 400, '400', 'Sorry, office name must be a string');
    }

    next();

    return null;
  }
}

export default OfficeValidation;
