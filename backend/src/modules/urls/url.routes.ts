import { createUrlHandler, getAnalyticsHandler, getUserUrlsHandler } from './url.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/create', createUrlHandler);
router.get('/:id/analytics', getAnalyticsHandler);
router.get('/my-urls', getUserUrlsHandler);

export default router;