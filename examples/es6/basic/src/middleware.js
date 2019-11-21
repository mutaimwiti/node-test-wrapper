import auth from 'basic-auth';
import { findUser } from './utils';

const checkAuth = (req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  const reqUser = auth(req);

  if (reqUser) {
    const { name, pass } = reqUser;

    const data = { username: name, password: pass };

    if (findUser(data)) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  });
};

// eslint-disable-next-line
export { checkAuth };
