import * as express from 'express';
import {
  addEvent,
  deleteEvent,
  editEvent,
  loadEvent,
  loadEventsWithTime,
} from '../controllers/event';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadEvent);
router.post('/', verifyJWT, addEvent);
router.patch('/:eventId', verifyJWT, editEvent);
router.delete('/:eventId', verifyJWT, deleteEvent);
router.get('/time', verifyJWT, loadEventsWithTime);

export default router;
