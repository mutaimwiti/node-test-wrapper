var jwt = require('jsonwebtoken');
var mock = require('./__mock__');

var mockUsers = mock.mockUsers;

var SECRET = 'secret';

function findUser(data) {
  if (!data) return null;

  return mockUsers.find(function(user) {
    return user.username === data.username && user.password === data.password;
  });
}

function generateAuthToken(data, done) {
  return jwt.sign(data, SECRET, done);
}

function decodeAuthToken(req, done) {
  var token = req.headers.authorization || '';

  if (!token) {
    return done(true);
  }

  return jwt.verify(token, SECRET, done);
}

function renderUnAuthorized(res) {
  return res.status(401).json({
    message: 'Unauthorized'
  });
}

module.exports.findUser = findUser;
module.exports.decodeAuthToken = decodeAuthToken;
module.exports.generateAuthToken = generateAuthToken;
module.exports.renderUnAuthorized = renderUnAuthorized;
