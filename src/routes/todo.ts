import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('todo');
});

export default router;
