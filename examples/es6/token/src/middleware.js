import { User } from './models';
import { decodeAuthToken, renderUnAuthorized } from './utils';

const checkAuth = async (req, res, next) => {
  if (req.path === '/' || req.path === '/auth/login') {
    return next();
  }

  try {
    const { username, password } = decodeAuthToken(req);

    const user = { username, password };

    return (await User.findOne(user)) ? next() : renderUnAuthorized(res);
  } catch (e) {
    return renderUnAuthorized(res);
  }
};

// eslint-disable-next-line
export { checkAuth };
