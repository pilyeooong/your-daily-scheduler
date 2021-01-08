import * as express from 'express';
import { signUp } from '../controllers/user';

const router = express.Router();

router.post('/', signUp);

export default router;
