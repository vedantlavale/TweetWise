// routes/debateRoutes.js
import express from 'express';
import { generateDebate, getUserDebates } from '../controllers/debateController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Save a generated debate
router.post('/', authMiddleware, generateDebate);

// Get all debates for the logged-in user
router.get('/', authMiddleware, getUserDebates);

export default router;
