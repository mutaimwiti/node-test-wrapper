const jwt = require('jsonwebtoken');

const SECRET = 'secret';

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
  decodeAuthToken,
  generateAuthToken,
  renderUnAuthorized,
};
