import User from './models/user';

const checkAuth = async (req, res, next) => {
  if (
    req.path === '/' ||
    req.path === '/auth/login' ||
    req.path === '/auth/logout'
  ) {
    return next();
  }

  const reqUser = req.session.user;

  if (reqUser) {
    if (await User.findOne(reqUser)) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  });
};

// eslint-disable-next-line
export { checkAuth };
