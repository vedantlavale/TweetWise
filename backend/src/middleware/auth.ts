import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {  // Explicitly return Promise<void>
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);  // Pass errors to Express error handler
  }
};