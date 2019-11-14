import { mockUsers } from './__mock__';

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
    const found = mockUsers.find(
      (user) =>
        user.username === reqUser.name && user.password === reqUser.pass,
    );

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
