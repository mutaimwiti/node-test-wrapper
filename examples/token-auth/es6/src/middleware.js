import { decodeAuthToken, renderUnAuthorized } from './utils';
import { mockUsers } from './__mock__';

const checkAuth = (req, res, next) => {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  try {
    const reqUser = decodeAuthToken(req);

    let found = false;

    if (reqUser) {
      found = mockUsers.find(
        (user) =>
          user.username === reqUser.username &&
          user.password === reqUser.password,
      );
    }

    return found ? next() : renderUnAuthorized(res);
  } catch (e) {
    return renderUnAuthorized(res);
  }
};

// eslint-disable-next-line
export { checkAuth };
