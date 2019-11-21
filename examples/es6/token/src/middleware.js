import { decodeAuthToken, findUser, renderUnAuthorized } from './utils';

const checkAuth = (req, res, next) => {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  try {
    const reqUser = decodeAuthToken(req);

    return findUser(reqUser) ? next() : renderUnAuthorized(res);
  } catch (e) {
    return renderUnAuthorized(res);
  }
};

// eslint-disable-next-line
export { checkAuth };
