// Converts a string param to an integer
function getIdParam(request) {
  const id = request.params.id;
  
  if (/^\d+$/.test(id)) {
    return parseInt(id);
  }
  
  throw new TypeError(`:id param "${id}" must be an integer`);
}

module.exports = { getIdParam };