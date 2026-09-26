const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const { GoogleGenAI } = require('@google/genai');

// POST: /api/faqs/ask
router.post('/ask', async (req, res) => {
  try {
    const { question, category } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // 1. Check local MongoDB cache
    const cached = await FAQ.findOne({
      question: { $regex: new RegExp(`^${question.trim()}$`, 'i') }
    });

    if (cached) {
      return res.json({ source: 'database_cache', data: cached });
    }

    // 2. Initialize Gemini AI with key
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 3. Request generative response
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide a concise 2-3 sentence answer to this question: "${question}"`
    });

    const aiAnswer = response.text;

    // 4. Save to Database
    const savedFAQ = await FAQ.create({
      question: question.trim(),
      category: category || 'General',
      aiAnswer
    });

    res.status(201).json({ source: 'gemini_ai_generated', data: savedFAQ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: /api/faqs (List all stored entries)
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json({ count: faqs.length, data: faqs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;