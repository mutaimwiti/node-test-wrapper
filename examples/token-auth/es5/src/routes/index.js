const Router = require('express').Router;

const auth = require('./auth');
const reports = require('./reports');
const articles = require('./articles');

const router = Router();

router.use('/auth', auth);
router.use('/reports', reports);
router.use('/articles', articles);

module.exports = router;
