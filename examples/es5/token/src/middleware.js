var utils = require('./utils');
var User = require('./models').User;

var decodeAuthToken = utils.decodeAuthToken;
var renderUnAuthorized = utils.renderUnAuthorized;

function checkAuth(req, res, next) {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  return decodeAuthToken(req, function(err, reqUser) {
    if (err) {
      return renderUnAuthorized(res);
    }

    var userData = {
      username: reqUser.username,
      password: reqUser.password
    };

    return User.findOne(userData, function(error, user) {
      return user ? next() : renderUnAuthorized(res);
    });
  });
}

module.exports.checkAuth = checkAuth;
