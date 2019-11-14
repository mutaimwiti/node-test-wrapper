import jwt from 'jsonwebtoken';

const SECRET = 'secret';

const generateAuthToken = (data) => jwt.sign(data, SECRET);

const decodeAuthToken = (req) => {
  const token = req.headers.authorization || '';

  if (!token) {
    throw Error('The authentication token is required');
  }

  return jwt.verify(token, SECRET);
};

const renderUnAuthorized = (res) =>
  res.status(401).json({
    message: 'Unauthorized',
  });

export { decodeAuthToken, generateAuthToken, renderUnAuthorized };
