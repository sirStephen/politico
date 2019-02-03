import pool from '../db/index';

import {
  parsedInt, success, error,
} from '../helpers/helpers';

/**
 * Processes all party data
 * @exports
 * @class PartyController
 */

class PartyController {
  /**
   *
   * @description create a party by the admin
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf PartyController
   */

  static createParty(request, response) {
    const {
      partyname, hqAddress, logoUrl, createat,
    } = request.body;

    const insertParty = 'INSERT INTO party(partyname, hqAddress, logoUrl, createat) VALUES($1, $2, $3, $4)';

    const insertValues = [partyname, hqAddress, logoUrl, createat];

    pool.query(insertParty, insertValues,
      (err, result) => {
        if (err) {
          return error(response, 500, '500', {
            message: 'cannot connect to database',
            err,
          });
        }

        if (result) {
          return success(response, 201, '201', {
            message: 'you have created a new party',
            partyname,
            hqAddress,
            logoUrl,
          });
        }

        return error(response, 400, '400', {
          message: 'an error occurred while creating a new party',
        });
      },
    );
  }

  /**
   *
   * @description get all parties
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf PartyController
   */

  static allParty(request, response) {
    const allPartySql = 'SELECT * FROM party ORDER BY id ASC';

    pool.query(allPartySql, (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result.rowCount > 0) {
        const getAllParties = result.rows;
        return success(response, 200, '200', getAllParties);
      }

      return error(response, 404, '404', 'Sorry, no party found');
    });
  }

  // static deleteParty(request, response) {
  //   const { id } = request.params;

  //   const party = partyDb.find(p => p.id === parsedInt(id));

  //   if (!party) {
  //     return error(response, 404, '404', 'Sorry, the party id was not found');
  //   }

  //   const index = partyDb.indexOf(party);
  //   partyDb.splice(index, 1);

  //   return success(response, 200, '200', 'The party was deleted successfully');
  // }

  /**
   *
   * @description get a party
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf PartyController
   */
  static getOneParty(request, response) {
    const { id } = request.params;

    const getParty = 'SELECT * FROM party WHERE id = $1';

    pool.query(getParty, [id], (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result.rowCount > 0) {
        const oneParty = result.rows;
        return success(response, 200, '200', {
          message: 'found party',
          oneParty,
        });
      }

      return error(response, 404, '404', 'Sorry, the party id was not found');
    });
  }

  /**
   *
   * @description update party
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf PartyController
   */
  static updateParty(request, response) {
    const { id } = request.params;

    const {
      partyname, hqAddress, logoUrl, createat,
    } = request.body;

    const updateParty = 'UPDATE party SET partyname = ($1), hqAddress = ($2), logoUrl = ($3), createat = ($4) WHERE id = ($5)';

    const updateValues = [partyname, hqAddress, logoUrl, createat, id];

    pool.query(updateParty, updateValues, (err, result) => {
      if (err) {
        return error(response, 500, '500', {
          message: 'cannot connect to database',
          err,
        });
      }

      if (result) {
        if (result.rowCount > 0) {
          return success(response, 200, '200', {
            message: 'the party was updated successfully',
            id,
            partyname,
            hqAddress,
            logoUrl,
          });
        }
      }

      return error(response, 404, '404', 'Sorry, the party id was not found');
    });
    return null;
  }
}

export default PartyController;
