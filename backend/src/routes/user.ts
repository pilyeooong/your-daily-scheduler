import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { editProfile, getMe, googleLogin, kakaoLogin, login, signUp } from '../controllers/user';

const router = express.Router();

router.get('/', verifyJWT, getMe);
router.post('/', signUp);
router.post('/login', login);
router.patch('/', verifyJWT, editProfile);
router.post('/kakao', kakaoLogin);
router.post('/google', googleLogin);

export default router;
