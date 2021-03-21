// Converts a string param to an integer
function getIdParam(request) {
  const id = request.params.id;
  
  if (/^\d+$/.test(id)) {
    return parseInt(id);
  }
  
  throw new TypeError(`:id param "${id}" must be an integer`);
}

function flash(req, messageObject) {
  req.session.flash = messageObject;
}

function assignFlash(request, object) {
  Object.assign(object, request.session.flash);
}

module.exports = { getIdParam, assignFlash, flash };