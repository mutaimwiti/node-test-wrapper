const Router = require('express').Router;
const mock = require('../__mock__');

const mockUsers = mock.mockUsers;

const router = Router();

router.post('/login', function(req, res) {
  if (!req.session.user) {
    const data = {
      name: req.body.username,
      pass: req.body.password,
    };

    const found = mockUsers.find(function(user) {
      return user.username === data.name && user.password === data.pass;
    });

    if (found) {
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
