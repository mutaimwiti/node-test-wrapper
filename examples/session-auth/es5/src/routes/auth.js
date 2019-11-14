const Router = require('express').Router;
const utils = require('../utils');

const findUser = utils.findUser;

const router = Router();

router.post('/login', function(req, res) {
  if (!req.session.user) {
    const data = req.body;

    if (findUser(data)) {
      req.session.user = data;
      return res.status(201).json({ message: 'Logged in successfully' });
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.status(200).json({ message: 'You are already logged in' });
});

router.post('/logout', function(req, res) {
  req.session.destroy(function() {
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
