// backend/routes/notes.js
import express from 'express';
import { supabase } from '../lib/supabase.js';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

// Define a specific limiter for POST requests
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, 
  message: { error: 'You have shared enough drama for this hour! Please wait.' }
});

// GET route (No strict limit)
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST route (Apply submitLimiter here)
router.post('/', submitLimiter, async (req, res) => {
  const { to_name, message, alias, color } = req.body;
  
  const { data, error } = await supabase
    .from('notes')
    .insert([{ to_name, message, alias, color }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data[0]);
});

export default router;