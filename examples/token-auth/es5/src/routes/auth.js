const Router = require('express').Router;
const mock = require('../__mock__');
const utils = require('../utils');

const mockUsers = mock.mockUsers;
const generateAuthToken = utils.generateAuthToken;
const renderUnAuthorized = utils.renderUnAuthorized;

const router = Router();

router.post('/login', function(req, res) {
  const data = {
    name: req.body.username,
    pass: req.body.password,
  };

  const found = mockUsers.find(function(user) {
    return user.username === data.name && user.password === data.pass;
  });

  if (found) {
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
