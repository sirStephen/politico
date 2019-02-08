import pool from '../db/index';

import {
  success, error,
} from '../helpers/helpers';

/**
 * Processes all party data
 * @exports
 * @class VotesController
 */

class VotesController {
  /**
   *
   * @description register candidate by the admin
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf VotesController
   */
  static candidates(request, response) {
    const userid = request.params.id;

    const {
      officeid, partyid,
    } = request.body;

    const insertCandidates = 'INSERT INTO candidates(officeid, partyid, userid) VALUES($1, $2, $3)';

    const insertValues = [officeid, partyid, userid];

    pool.query(insertCandidates, insertValues, (err, result) => {
      if (err) {
        return error(response, 409, '409', 'cannot register twice');
      }

      if (result) {
        return success(response, 201, '201', 'registered candidate successfully');
      }

      return error(response, 404, '404', 'not found');
    });
  }

  /**
   *
   * @description vote candidate by user
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf VotesController
   */
  static votes(request, response) {
    const {
      officeid, voterid, candidateid,
    } = request.body;

    const insertVote = 'INSERT INTO votes(officeid, voterid, candidateid) VALUES($1, $2, $3)';

    const insertValues = [officeid, voterid, candidateid];

    pool.query(insertVote, insertValues, (err, result) => {
      if (err) {
        return error(response, 409, '409', 'cannot vote twice');
      }

      if (result) {
        return success(response, 200, '200', 'voted candidate successfully');
      }

      return error(response, 404, '404', 'error in voting for candidate');
    });
  }

  /**
   *
   * @description get total votes by the admin
   * @static method
   * @param {object} request - Request object
   * @param {object} response - Reponse object
   * @returns {json} response.json
   * @memberOf VotesController
   */
  static async totalVotes(request, response) {
    const totalQuery = 'SELECT COUNT(votes.candidateid) AS totalvote, candidates.officeid, candidates.userid FROM votes JOIN candidates ON candidates.userid = votes.voterid WHERE votes.candidateid = candidates.userid AND candidates.officeid = $1 GROUP BY candidates.userid, candidates.userid, candidates.officeid';

    const id = [request.params.id];

    try {
      const { rows } = await pool.query(totalQuery, id);
      if (!rows[0]) {
        return error(response, 404, '404', 'Sorry, office with the id not found');
      }

      return success(response, 200, '200', {
        message: [{
          office: rows[0].officeid,
          candidates: rows[0].userid,
          result: rows[0].totalvote,
        }],
      });
    } catch (err) {
      return error(response, 500, '500', 'Sorry, unexpected database error');
    }
  }
}

export default VotesController;
