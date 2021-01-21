import * as express from 'express';
import todoRouter from './todo';
import todosRouter from './todos';
import userRouter from './user';
import scheduleRouter from './schedule';
import eventRouter from './event';
import eventsRouter from './events';
import weatherRouter from './weather';

const router = express.Router();

router.use('/user', userRouter);
router.use('/schedule', scheduleRouter);
router.use('/todo', todoRouter);
router.use('/todos', todosRouter);
router.use('/event', eventRouter);
router.use('/events', eventsRouter);
router.use('/weather', weatherRouter);

export default router;
