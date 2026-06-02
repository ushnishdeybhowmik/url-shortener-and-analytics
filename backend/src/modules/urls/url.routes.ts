import { createUrlHandler } from './url.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/create', createUrlHandler);

export default router;