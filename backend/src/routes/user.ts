import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { getMe, login, signUp } from '../controllers/user';

const router = express.Router();

router.get('/', verifyJWT, getMe);
router.post('/', signUp);
router.post('/login', login);

export default router;
