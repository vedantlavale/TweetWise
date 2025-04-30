// src/app.ts
import express from 'express';
import cors from 'cors';
import { prisma } from './config/prisma';

const app = express();
app.use(cors());
app.use(express.json());

// Add this basic test route
app.get('/health', (req, res) => {
  console.log('Health check called'); // This should appear in terminal
  res.send('OK');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // This log is CRUCIAL to confirm server started
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Verify Prisma connection
  prisma.$connect()
    .then(() => console.log('✅ Prisma connected to DB'))
    .catch((err: Error) => console.error('❌ Prisma connection error:', err));
});