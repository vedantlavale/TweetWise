import { Router, Request, Response, NextFunction } from 'express';
import { saveTweet } from '../controllers/tweet.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', 
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next).catch(next);
  },
  saveTweet
);

export default router;