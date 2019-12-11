var auth = require('basic-auth');
var User = require('./models').User;
var renderUnAuthorized = require('./utils').renderUnAuthorized;

function checkAuth(req, res, next) {
  if (req.path === '/') {
    return next();
  }

  var reqUser = auth(req);

  if (reqUser) {
    var user = {
      username: reqUser.name,
      password: reqUser.pass
    };

    return User.findOne(user, function(err) {
      if (err) {
        return renderUnAuthorized(res);
      }
      return next();
    });
  }

  return renderUnAuthorized(res);
}

module.exports.checkAuth = checkAuth;
