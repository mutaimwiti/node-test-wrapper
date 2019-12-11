var Router = require('express').Router;

var router = Router();

router.use('/reports', require('./reports'));
router.use('/articles', require('./articles'));

module.exports = router;
