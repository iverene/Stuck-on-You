// backend/index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit'; // New import
import noteRoutes from './routes/notes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Global Rate Limiter (Optional - apply to all routes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});

// 2. Stricter Limiter for Note Submissions
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // Limit each IP to 5 note submissions per hour
  message: 'You have stuck enough notes for now! Please wait an hour before sharing more drama.',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Apply Global Limiter
app.use(globalLimiter);

// Routes
// Apply the stricter limiter specifically to the POST route logic
// You can apply it here or inside routes/notes.js
app.use('/api/notes', noteRoutes);

// Health Check
app.get('/', (req, res) => res.send('Stuck on You API is running with Rate Limiting!'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});