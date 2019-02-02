// import partyDb from '../models/partyDb';
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
   * @memberOf PartyControllers
   */

  static createParty(request, response) {
    const {
      partyname, hqAddress, logoUrl, createat,
    } = request.body;

    pool.query(
      'INSERT INTO party(partyname, hqAddress, logoUrl, createat) VALUES($1, $2, $3, $4)',
      [partyname, hqAddress, logoUrl, createat],
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

        return null;
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
   * @memberOf PartyControllers
   */

  static allParty(request, response) {
    pool.query('SELECT * FROM party ORDER BY id ASC', (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result.rowCount > 0) {
        const getAllParties = result.rows;
        return success(response, 200, '200', getAllParties);
      }

      return error(response, 404, '404', 'no products found');
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

  // static getOneParty(request, response) {
  //   const { id } = request.params;

  //   const party = partyDb.find(p => p.id === parsedInt(id));

  //   if (party) {
  //     return success(response, 200, '200', party);
  //   }

  //   return error(response, 404, '404', 'Sorry, the party id was not found');
  // }

  // static updateParty(request, response) {
  //   const { id } = request.params;

  //   const party = partyDb.find(p => p.id === parsedInt(id));

  //   if (party) {
  //     party.partyName = request.body.partyName;
  //     party.hqAddress = request.body.hqAddress;

  //     return success(response, 200, '200', party);
  //   }

  //   return error(response, 404, '404', 'Sorry, the party id was not found');
  // }
}

export default PartyController;
