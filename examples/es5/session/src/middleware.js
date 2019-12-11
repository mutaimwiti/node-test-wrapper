var User = require('./models').User;
var renderUnAuthorized = require('./utils').renderUnAuthorized;

function checkAuth(req, res, next) {
  if (
    req.path === '/' ||
    req.path === '/auth/login' ||
    req.path === '/auth/logout'
  ) {
    return next();
  }

  var reqUser = req.session.user;

  if (reqUser) {
    return User.findOne(reqUser, function(err) {
      if (err) {
        return renderUnAuthorized(res);
      }
      return next();
    });
  }

  return renderUnAuthorized(res);
}

module.exports.checkAuth = checkAuth;
