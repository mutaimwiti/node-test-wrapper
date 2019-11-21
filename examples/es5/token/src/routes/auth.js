var Router = require('express').Router;
var utils = require('../utils');

var findUser = utils.findUser;
var generateAuthToken = utils.generateAuthToken;
var renderUnAuthorized = utils.renderUnAuthorized;

var router = Router();

router.post('/login', function(req, res) {
  var data = req.body;

  if (findUser(data)) {
    return generateAuthToken(data, function(err, token) {
      if (err) {
        return renderUnAuthorized(res);
      }
      return res
        .status(201)
        .json({ message: 'Logged in successfully', token: token });
    });
  }

  return renderUnAuthorized(res);
});

module.exports = router;
