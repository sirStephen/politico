import officeDb from '../models/officeDb';

import {
  parsedInt, success, error, isValid,
} from '../helpers/helpers';

class OfficeController {
  static createOffice(request, response) {
    const office = request.body;

    if (office) {
      officeDb.push({
        id: officeDb.length + 1,
        ...office,
      });
      return success(response, 201, '201', officeDb[officeDb.length - 1]);
    }
    return error(response, 404, '404', 'Sorry, could not process your request');
  }

  static allOffice(request, response) {
    if (officeDb.length > 0) {
      return success(response, 200, '200', officeDb);
    }
    return success(response, 200, '200', 'no registered office');
  }

  static getOneOffice(request, response) {
    const { id } = request.params;

    const office = officeDb.find(o => o.id === parsedInt(id));

    if (office) {
      return success(response, 200, '200', office);
    }

    return error(response, 404, '404', 'Sorry, the office id was not found');
  }
}

export default OfficeController;
