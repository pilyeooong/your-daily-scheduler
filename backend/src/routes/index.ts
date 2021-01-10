import * as express from 'express';
import todoRouter from './todo';
import userRouter from './user';
import scheduleRouter from './schedule';

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/user', userRouter);
router.use('/schedule', scheduleRouter);

export default router;
