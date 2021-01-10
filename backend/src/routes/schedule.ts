import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { loadSchedules } from '../controllers/schedule';

const router = express.Router();

router.get('/', verifyJWT, loadSchedules);

export default router;
