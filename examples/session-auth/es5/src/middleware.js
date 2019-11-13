const mock = require('./__mock__');

const mockUsers = mock.mockUsers;

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
    const found = mockUsers.find(function(user) {
      return user.username === reqUser.name && user.password === reqUser.pass;
    });

    if (found) {
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
