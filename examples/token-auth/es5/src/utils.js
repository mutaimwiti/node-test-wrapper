const jwt = require('jsonwebtoken');
const mock = require('./__mock__');

const mockUsers = mock.mockUsers;

const SECRET = 'secret';

function findUser(data) {
  return mockUsers.find(function(user) {
    return user.username === data.username && user.password === data.password;
  });
}

function generateAuthToken(data, done) {
  return jwt.sign(data, SECRET, done);
}

function decodeAuthToken(req, done) {
  const token = req.headers.authorization || '';

  if (!token) {
    return done(true);
  }

  return jwt.verify(token, SECRET, done);
}

function renderUnAuthorized(res) {
  return res.status(401).json({
    message: 'Unauthorized',
  });
}

module.exports = {
  findUser,
  decodeAuthToken,
  generateAuthToken,
  renderUnAuthorized,
};
