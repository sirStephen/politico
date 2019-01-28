import { error } from '../../helpers/helpers';

class PartyValidation {
  static isCreatePartyValid(request, response, next) {
    const {
      partyName, hqAddress,
    } = request.body;

    if (partyName === '') {
      return error(response, 400, 'party name is required');
    }

    if (hqAddress === '') {
      return error(response, 400, 'hqAddress is required');
    }

    if (typeof partyName !== 'string') {
      return error(response, 400, 'party name must be a string');
    }

    next();

    return null;
  }
}

export default PartyValidation;
