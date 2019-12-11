var Router = require('express').Router;

var User = require('../models').User;
var renderUnAuthorized = require('../utils').renderUnAuthorized;

var router = Router();

router.post('/login', function(req, res) {
  if (!req.session.user) {
    var data = req.body;

    return User.findOne(data, function(err, user) {
      if (user) {
        req.session.user = data;

        return res.status(201).json({ message: 'Logged in successfully' });
      }

      return renderUnAuthorized(res);
    });
  }

  return res.status(200).json({ message: 'You are already logged in' });
});

router.post('/logout', function(req, res) {
  req.session.destroy(function() {
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
