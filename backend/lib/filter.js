import { supabase } from './supabase.js';
import natural from 'natural';

const stemmer = natural.PorterStemmer;
let bannedWordsCache = [];
let lastFetched = 0;

const getBannedWords = async () => {
  const now = Date.now();
  if (bannedWordsCache.length > 0 && now - lastFetched < 300000) {
    return bannedWordsCache;
  }

  const { data } = await supabase.from('prohibited_words').select('word');
  bannedWordsCache = data?.map(row => row.word.toLowerCase()) || [];
  lastFetched = now;
  return bannedWordsCache;
};

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[04@]/g, 'a')
    .replace(/[3]/g, 'e')
    .replace(/[1!|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[5$]/g, 's')
    .replace(/[7+]/g, 't')
    .replace(/[^a-z\s]/g, '')
    .replace(/(.)\1+/g, '$1');
};

export const isOffensive = async (text) => {
  if (!text) return false;
  
  const bannedWords = await getBannedWords();
  const cleanText = normalizeText(text);
  
  // Split into tokens for individual word checking
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(cleanText);

  // Direct Token Match (Word-by-word)
  const hasBannedToken = tokens.some(token => {
    const stemmed = stemmer.stem(token); 
    return bannedWords.includes(token) || bannedWords.includes(stemmed);
  });

  if (hasBannedToken) return true;

  // Check 2: Substring Match (The "Aggressive" Check)
  const spacelessText = cleanText.replace(/\s+/g, '');
  const hasHiddenWord = bannedWords.some(banned => spacelessText.includes(banned));

  return hasHiddenWord;
};