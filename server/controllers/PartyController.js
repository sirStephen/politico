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

  static deleteParty(request, response) {
    const { id } = request.params;

    const parseId = parsedInt(id);

    // check if id is a number
    if (!(Number.isInteger(parseId))) {
      return error(response, 404, '404', 'Sorry, the party id must be an integer');
    }

    const party = partyDb.find(p => p.id === parseInt(request.params.id, 10));

    if (!party) {
      return error(response, 404, '404', 'Sorry, the party id was not found');
    }

    const index = partyDb.indexOf(party);
    partyDb.splice(index, 1);

    return success(response, 200, '200', 'The party was deleted successfully');
  }
}

export default PartyController;
