import jwt from 'jsonwebtoken';
import { mockUsers } from './__mock__';

const SECRET = 'secret';

const findUser = (data) =>
  mockUsers.find(function(user) {
    return user.username === data.username && user.password === data.password;
  });

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

export { findUser, decodeAuthToken, generateAuthToken, renderUnAuthorized };
