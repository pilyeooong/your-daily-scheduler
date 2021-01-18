import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { loadTodos, switchTodoOrders } from '../controllers/todo';

const router = express.Router();

router.get('/', verifyJWT, loadTodos);
router.post('/orders', verifyJWT, switchTodoOrders);

export default router;
