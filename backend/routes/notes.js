// backend/routes/notes.js
import express from 'express';
import { supabase } from '../lib/supabase.js';
import { rateLimit } from 'express-rate-limit';
import { isOffensive } from '../lib/filter.js';

const router = express.Router();

// Updated limiter: 50 posts per 20 minutes per IP
const submitLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  limit: 50, // 50 requests
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too much drama! Please wait a few minutes before posting again.' }
});

// GET route remains unrestricted
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

router.post('/', submitLimiter, async (req, res) => {
  const { to_name, message, alias, color } = req.body;

  // Combine all fields to check for profanity in one go
  const contentToCheck = `${to_name} ${message} ${alias}`;
  const hasProfanity = await isOffensive(contentToCheck);

  if (hasProfanity) {
    return res.status(400).json({ 
      //error: 'Your message contains words that violate our community guidelines.'
      error: 'Oops your message has some words that we can\'t allow - Magmahalan lang po tayo :)'
    });
  }

  const { data, error } = await supabase
    .from('notes')
    .insert([{ to_name, message, alias, color }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data[0]);
});

export default router;