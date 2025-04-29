import express from 'express';
import * as cors from 'cors';
import dotenv from 'dotenv';
import { requireAuth } from './auth/requireAuth.js';

// Routes
import enhanceRouter from './routes/enhance.js';
import debateRouter from './routes/debate.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Protected routes with type assertion to resolve middleware typing issues
app.use('/api/enhance', requireAuth as express.RequestHandler, enhanceRouter);
app.use('/api/debate', requireAuth as express.RequestHandler, debateRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});