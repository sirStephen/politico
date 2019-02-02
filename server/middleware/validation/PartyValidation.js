import { error, parsedInt } from '../../helpers/helpers';

class PartyValidation {
  static isCreatePartyValid(request, response, next) {
    const {
      partyname, hqAddress,
    } = request.body;

    if (partyname === '' || !partyname) {
      return error(response, 400, '400', 'Sorry, party name is required');
    }

    if (hqAddress === '' || !hqAddress) {
      return error(response, 400, '400', 'Sorry, hqAddress is required');
    }

    if (typeof partyname !== 'string') {
      return error(response, 400, '400', 'Sorry,party name must be a string');
    }

    next();

    return null;
  }

  static isIdAnInteger(request, response, next) {
    const { id } = request.params;

    const parseId = parsedInt(id);

    if (!(Number.isInteger(parseId))) {
      return error(response, 404, '404', 'Sorry, the party id must be an integer');
    }

    return next();
  }
}

export default PartyValidation;
