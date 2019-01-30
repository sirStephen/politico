import partyDb from '../models/partyDb';

import {
  parsedInt, success, error, isValid,
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
    return error(response, 404, '404', 'Sorry, could not process your request');
  }

  static allParty(request, response) {
    if (partyDb.length > 0) {
      return success(response, 200, '200', partyDb);
    }
    return success(response, 200, '200', 'no registered party');
  }

  static deleteParty(request, response) {
    const { id } = request.params;

    const party = partyDb.find(p => p.id === parsedInt(id));

    if (!party) {
      return error(response, 404, '404', 'Sorry, the party id was not found');
    }

    const index = partyDb.indexOf(party);
    partyDb.splice(index, 1);

    return success(response, 200, '200', 'The party was deleted successfully');
  }

  static getOneParty(request, response) {
    const { id } = request.params;

    const party = partyDb.find(p => p.id === parsedInt(id));

    if (party) {
      return success(response, 200, '200', party);
    }

    return error(response, 404, '404', 'Sorry, the party id was not found');
  }

  static updateParty(request, response) {
    const { id } = request.params;

    const party = partyDb.find(p => p.id === parsedInt(id));

    if (party) {
      party.partyName = request.body.partyName;
      party.hqAddress = request.body.hqAddress;

      return success(response, 200, '200', party);
    }

    return error(response, 404, '404', 'Sorry, the party id was not found');
  }
}

export default PartyController;
