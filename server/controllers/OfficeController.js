import pool from '../db/index';

import {
  success, error,
} from '../helpers/helpers';

/**
 * Processes all office data
 * @exports
 * @class PartyController
 */

class OfficeController {
  /**
   *
   * @description create a office by the admin
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf OfficeController
   */

  static createOffice(request, response) {
    const {
      officename, type, createat,
    } = request.body;

    const insertOffice = 'INSERT INTO office(officename, type, createat) VALUES($1, $2, $3)';

    const insertValues = [officename, type, createat];

    pool.query(insertOffice, insertValues,
      (err, result) => {
        if (err) {
          return error(response, 500, '500', {
            message: 'cannot connect to database',
            err,
          });
        }

        if (result) {
          return success(response, 201, '201', {
            message: 'you have created a new office',
            officename,
            type,
          });
        }

        return error(response, 400, '400', {
          message: 'an error occurred while creating a new office',
        });
      });
  }

  static allOffice(request, response) {
    const allOfficeSql = 'SELECT * FROM office ORDER BY id ASC';

    pool.query(allOfficeSql, (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result.rowCount > 0) {
        const getAllOffice = result.rows;
        return success(response, 200, '200', getAllOffice);
      }

      return error(response, 404, '404', 'Sorry, no party found');
    });
  }

  // static getOneOffice(request, response) {
  //   const { id } = request.params;

  //   const office = officeDb.find(o => o.id === parsedInt(id));

  //   if (office) {
  //     return success(response, 200, '200', office);
  //   }

  //   return error(response, 404, '404', 'Sorry, the office id was not found');
  // }
}

export default OfficeController;
