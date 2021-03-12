import * as express from 'express';
import { loadCovidStatusData, refreshCovidData } from '../controllers/covid';
import { verifyJWT } from '../controllers/jwt';

const router = express.Router();

router.get('/', verifyJWT, loadCovidStatusData);
router.get('/refresh', verifyJWT, refreshCovidData);

export default router;
