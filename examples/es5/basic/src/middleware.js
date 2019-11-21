var auth = require('basic-auth');
var utils = require('./utils');

var findUser = utils.findUser;

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

    if (findUser(user)) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized'
  });
}

module.exports.checkAuth = checkAuth;
