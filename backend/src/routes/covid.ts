import * as express from 'express';
import { loadCovidStatusData } from '../controllers/covid';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadCovidStatusData);

export default router;
