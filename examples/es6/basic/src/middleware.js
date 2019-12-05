import auth from 'basic-auth';
import User from './models/user';

const checkAuth = async (req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  const reqUser = auth(req);

  if (reqUser) {
    const { name, pass } = reqUser;

    const data = { username: name, password: pass };

    if (await User.findOne(data)) {
      return next();
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  });
};

// eslint-disable-next-line
export { checkAuth };
