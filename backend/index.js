import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import noteRoutes from './routes/notes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Optimized CORS Configuration
const corsOptions = {
  origin: ['https://stuck-on-you.vercel.app' , 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Health Check
app.get('/', (req, res) => res.send('Stuck on You API is running!'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});