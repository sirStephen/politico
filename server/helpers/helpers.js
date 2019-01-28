/* Check the id of every request to see whether it can be converted to number */
export const parsedInt = id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10));

// when a request is successful
export const success = (response, statusCode, status, data) => response.status(statusCode)
  .json({ status, data });

// when a request has an error
export const error = (response, statusCode, message) => response.status(statusCode)
  .json({ message });

// find a party
export const find = (partyArray, id) => partyArray.find(party => (id === party.id));

// Validate item
export const isValid = (party) => {
  // validations
  const partyName = party.partyName.trim() !== '';

  return partyName;
};
