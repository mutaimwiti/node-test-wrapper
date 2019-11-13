const auth = require('basic-auth');
const mock = require('./__mock__');

const mockUsers = mock.mockUsers;

function checkAuth(req, res, next) {
  if (req.path === '/') {
    return next();
  }

  const reqUser = auth(req);

  if (reqUser !== undefined) {
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
