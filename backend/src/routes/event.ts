import * as express from 'express';
import { addEvent, loadEvent } from '../controllers/event';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadEvent);
router.post('/', verifyJWT, addEvent);

export default router;
