import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { addTodo, deleteTodo, editTodo, todoDetail } from '../controllers/todo';

const router = express.Router();

router.post('/', verifyJWT, addTodo);
router.get('/:todoId', verifyJWT, todoDetail);
router.patch('/:todoId', verifyJWT, editTodo);
router.delete('/:todoId', verifyJWT, deleteTodo);

export default router;
