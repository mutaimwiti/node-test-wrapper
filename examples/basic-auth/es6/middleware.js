import auth from 'basic-auth';
import { mockUsers } from './__mock__';

const checkAuth = (req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  const reqUser = auth(req);

  if (reqUser !== undefined) {
    const { name, pass } = reqUser;

    const found = mockUsers.find(function({ username, password }) {
      return username === name && password === pass;
    });

    if (found) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  });
};

// eslint-disable-next-line
export { checkAuth };
