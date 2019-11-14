import { findUser } from './utils';

const checkAuth = (req, res, next) => {
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
};

// eslint-disable-next-line
export { checkAuth };
