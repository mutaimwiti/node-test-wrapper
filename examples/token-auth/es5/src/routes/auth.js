const Router = require('express').Router;
const utils = require('../utils');

const findUser = utils.findUser;
const generateAuthToken = utils.generateAuthToken;
const renderUnAuthorized = utils.renderUnAuthorized;

const router = Router();

router.post('/login', function(req, res) {
  const data = req.body;

  if (findUser(data)) {
    return generateAuthToken(data, function(err, token) {
      if (err) {
        return renderUnAuthorized(res);
      }
      return res.status(201).json({ message: 'Logged in successfully', token });
    });
  }

  return renderUnAuthorized(res);
});

module.exports = router;
