import pool from '../db/index';

import {
  success, error,
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
          console.log(err);
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
      });
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

  /**
   *
   * @description delete party
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf PartyController
   */
  static deleteParty(request, response) {
    const { id } = request.params;

    const deleteParty = 'DELETE FROM party WHERE id = ($1)';

    pool.query(deleteParty, [id], (err, result) => {
      if (err) {
        return error(response, 500, '500', 'cannot connect to database');
      }

      if (result) {
        if (result.rowCount > 0) {
          return success(response, 200, '200', 'The party was deleted successfully');
        }
      }
      return error(response, 404, '404', 'Sorry, party id does not exist');
    });
    return null;
  }

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
  static async updateParty(request, response) {
    const { id } = request.params;
    const partyName = request.body.partyname;

    const findPartyId = 'SELECT * FROM party WHERE id = $1';

    const updateQuery = 'UPDATE party SET partyname = $1 WHERE id = $2 RETURNING id, partyname';

    try {
      const { rows } = await pool.query(findPartyId, [id]);
      if (!rows[0]) {
        return error(response, 404, '404', 'Sorry, party with the id not found');
      }

      const updateResult = await pool.query(updateQuery, [partyName, id]);

      return success(response, 200, '200', updateResult.rows[0]);
    } catch (err) {
      return error(response, 500, '500', 'Sorry, unexpected database error');
    }
  }
}

export default PartyController;
