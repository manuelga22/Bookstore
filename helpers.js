// Converts a string param to an integer
function getIdParam(request) {
  const id = request.params.id;
  
  if (/^\d+$/.test(id)) {
    return parseInt(id);
  }
  
  throw new TypeError(`:id param "${id}" must be an integer`);
}

function assignFlash(request, object) {
  if (request.query.success) {
    Object.assign(object, {success: request.query.success});
  }
  if (request.query.danger) {
    Object.assign(object, {danger: request.query.danger});
  }
}

module.exports = { getIdParam, assignFlash };