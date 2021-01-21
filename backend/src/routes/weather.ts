import * as express from 'express';
import { verifyJWT } from '../controllers/jwt';
import { getWeather } from '../controllers/weather';

const router = express.Router();

router.get('/', getWeather);

export default router;
