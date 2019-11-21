var Router = require('express').Router;

var reports = require('./reports');
var articles = require('./articles');

var router = Router();

router.use('/reports', reports);
router.use('/articles', articles);

module.exports = router;
