var Router = require('express').Router;

var utils = require('../utils');
var User = require('../models').User;

var generateAuthToken = utils.generateAuthToken;
var renderUnAuthorized = utils.renderUnAuthorized;

var router = Router();

router.post('/login', function(req, res) {
  var data = req.body;

  return User.findOne(data, function(err, user) {
    if (user) {
      return generateAuthToken(data, function(error, token) {
        if (error) {
          return renderUnAuthorized(res);
        }

        return res
          .status(201)
          .json({ message: 'Logged in successfully', token: token });
      });
    }

    return renderUnAuthorized(res);
  });
});

module.exports = router;
