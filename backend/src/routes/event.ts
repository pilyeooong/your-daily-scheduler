import * as express from 'express';
import { addEvent, loadEvent, loadEventsWithTime } from '../controllers/event';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadEvent);
router.get('/time', verifyJWT, loadEventsWithTime);
router.post('/', verifyJWT, addEvent);

export default router;
