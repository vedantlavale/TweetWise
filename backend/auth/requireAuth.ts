import { Request, Response, NextFunction } from 'express';
import supabase from '../db/supabaseClient';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    try {
        // Get the token from the Authorization header
        const token = authHeader.replace('Bearer ', '');
        
        // Verify the JWT token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Add the user to the request object for use in route handlers
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

// Type augmentation for Express Request
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}