var Router = require('express').Router;

var auth = require('./auth');
var reports = require('./reports');
var articles = require('./articles');

var router = Router();

router.use('/auth', auth);
router.use('/reports', reports);
router.use('/articles', articles);

module.exports = router;
