import { Router } from 'express';

import reports from './reports';
import articles from './articles';

const router = Router();

router.use('/reports', reports);
router.use('/articles', articles);

export default router;
