import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { loadTodos } from '../controllers/todo';

const router = express.Router();

router.get('/:id', verifyJWT, loadTodos);

export default router;
