const utils = require('./utils');

const findUser = utils.findUser;
const decodeAuthToken = utils.decodeAuthToken;
const renderUnAuthorized = utils.renderUnAuthorized;

function checkAuth(req, res, next) {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  return decodeAuthToken(req, function(err, reqUser) {
    return findUser(reqUser) ? next() : renderUnAuthorized(res);
  });
}

module.exports = {
  checkAuth,
};
