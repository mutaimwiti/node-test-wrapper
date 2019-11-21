import { Router } from 'express';

import auth from './auth';
import reports from './reports';
import articles from './articles';

const router = Router();

router.use('/auth', auth);
router.use('/reports', reports);
router.use('/articles', articles);

export default router;
