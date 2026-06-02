import { createUrlHandler, getAnalyticsHandler } from './url.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/create', createUrlHandler);
router.get('/:id/analytics', getAnalyticsHandler);

export default router;