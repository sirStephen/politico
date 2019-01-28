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
}

export default PartyController;
