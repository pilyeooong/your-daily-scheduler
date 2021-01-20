import * as express from 'express';
import { loadEvents } from '../controllers/event';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadEvents);

export default router;
