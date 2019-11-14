const utils = require('./utils');

const findUser = utils.findUser;

function checkAuth(req, res, next) {
  if (
    req.path === '/' ||
    req.path === '/auth/login' ||
    req.path === '/auth/logout'
  ) {
    return next();
  }

  const reqUser = req.session.user;

  if (reqUser) {
    if (findUser(reqUser)) {
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
