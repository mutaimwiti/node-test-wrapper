var Router = require('express').Router;
var utils = require('../utils');

var findUser = utils.findUser;

var router = Router();

router.post('/login', function(req, res) {
  if (!req.session.user) {
    var data = req.body;

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
