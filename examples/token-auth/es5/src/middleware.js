var utils = require('./utils');

var findUser = utils.findUser;
var decodeAuthToken = utils.decodeAuthToken;
var renderUnAuthorized = utils.renderUnAuthorized;

function checkAuth(req, res, next) {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  return decodeAuthToken(req, function(err, reqUser) {
    return findUser(reqUser) ? next() : renderUnAuthorized(res);
  });
}

module.exports.checkAuth = checkAuth;
