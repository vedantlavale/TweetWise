import express from 'express';
import { createTweetHistory, createDebateHistory, getHistory, deleteHistory } from '../controllers/chatController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// History routes
router.post('/tweet', createTweetHistory);
router.post('/debate', createDebateHistory);
router.get('/', getHistory);
router.delete('/:chatId', deleteHistory);

export default router; 