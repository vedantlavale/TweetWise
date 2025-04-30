import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const saveTweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { original, enhanced } = req.body;
    const userId = req.user?.id;
    
    const tweet = await prisma.tweet.create({
      data: { userId, original, enhanced }
    });
    
    res.json(tweet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save tweet' });
  }
};