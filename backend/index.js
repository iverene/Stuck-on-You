import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import noteRoutes from './routes/notes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Optimized CORS Configuration
// This explicitly allows your frontend and handles the 'OPTIONS' preflight request
const corsOptions = {
  origin: 'https://stuck-on-you.vercel.app', // Your specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// 2. Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' },
});

// 3. Apply Global Limiter
app.use(globalLimiter);

// 4. Routes
app.use('/api/notes', noteRoutes);

// Health Check
app.get('/', (req, res) => res.send('Stuck on You API is running with Rate Limiting!'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
