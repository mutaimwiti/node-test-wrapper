const Router = require('express').Router;

const reports = require('./reports');
const articles = require('./articles');

const router = Router();

router.use('/reports', reports);
router.use('/articles', articles);

module.exports = router;
