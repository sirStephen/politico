import partyDb from '../models/partyDb';

import {
  parsedInt, success, error, find, isValid,
} from '../helpers/helpers';

class PartyController {
  static createParty(request, response) {
    const party = request.body;

    // if party is valid
    if (isValid(party)) {
      partyDb.push({
        id: partyDb.length + 1,
        ...party,
      });
      return success(response, 201, '201', partyDb[partyDb.length - 1]);
    }
    return error(response, 400, 'Please enter the missing fields');
  }

  static getOneParty(request, response) {
    const { id } = request.params;

    const parsedId = parsedInt(id);
    let partyDetails = '';

    // check if id is a number
    if (!(Number.isInteger(parsedId))) {
      return error(response, 404, '404', 'Sorry, the party id must be an integer');
    }

    partyDetails = find(partyDb, parsedId);
    // if product is found
    if (partyDetails) {
      return success(response, 200, '200', partyDetails);
    }

    return error(response, 404, '404', 'Sorry, the party id does not exist');
  }
}

export default PartyController;
