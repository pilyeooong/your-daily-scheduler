import * as express from 'express';
import todoRouter from './todo';
import userRouter from './user';

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/user', userRouter);

export default router;
