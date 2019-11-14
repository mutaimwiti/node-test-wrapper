const auth = require('basic-auth');
const utils = require('./utils');

const findUser = utils.findUser;

function checkAuth(req, res, next) {
  if (req.path === '/') {
    return next();
  }

  const reqUser = auth(req);

  if (reqUser) {
    const user = {
      username: reqUser.name,
      password: reqUser.pass,
    };

    if (findUser(user)) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  });
}

module.exports = {
  checkAuth,
};
