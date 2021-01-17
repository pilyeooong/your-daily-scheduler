import * as express from 'express';
import todoRouter from './todo';
import todosRouter from './todos';
import userRouter from './user';
import scheduleRouter from './schedule';

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/todos', todosRouter);
router.use('/user', userRouter);
router.use('/schedule', scheduleRouter);

export default router;
