// routes/tweetRoutes.js
import express from 'express';
import { generateTweet, getUserTweets } from '../controllers/tweetController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Save a generated tweet
router.post('/', authMiddleware, generateTweet);

// Get all tweets for the logged-in user
router.get('/', authMiddleware, getUserTweets);

export default router;
