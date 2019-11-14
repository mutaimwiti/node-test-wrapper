const utils = require('./utils');
const mock = require('./__mock__');

const mockUsers = mock.mockUsers;
const decodeAuthToken = utils.decodeAuthToken;
const renderUnAuthorized = utils.renderUnAuthorized;

function checkAuth(req, res, next) {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  return decodeAuthToken(req, function(err, reqUser) {
    let found = false;

    if (reqUser) {
      found = mockUsers.find(function(user) {
        return (
          user.username === reqUser.username &&
          user.password === reqUser.password
        );
      });
    }

    return found ? next() : renderUnAuthorized(res);
  });
}

module.exports = {
  checkAuth,
};
