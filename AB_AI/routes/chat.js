const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check if the API key is provided
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// System Instructions to constrain the AI strictly to Astrology and Institute related topics
const SYSTEM_INSTRUCTION = `You are a respectful, knowledgeable, and helpful AI Astrology Assistant for the Parashari Indian Institute of Astrology and Research Center.
Your purpose is to answer questions strictly related to:
- Vedic Astrology
- KP Astrology
- BNN Astrology
- Numerology
- Vastu Shastra
- Tarot Reading
- Palmistry
- Mental Health & Guidance (from an astrological perspective)
- Courses and details about the Parashari Institute

CRITICAL RULES:
1. Do NOT answer any questions unrelated to the topics above (e.g., coding, politics, general knowledge, math, science, sports). If asked about unrelated topics, politely decline and say you are specifically trained to help with Astrology and Institute courses.
2. Keep your answers relatively concise, warm, and helpful. Use simple markdown formatting (bolding) if necessary.
3. If they ask about taking a course, you can encourage them to check the "Course Search" or "Courses" menu.`;

router.post('/ask', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!genAI) {
            return res.json({
                reply: "The AI system is not fully configured yet. Please ensure GEMINI_API_KEY is set in your .env file.",
                redirectUrl: null
            });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Initialize model with the system instructions
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Format the incoming history (from the frontend) into Gemini's expected format
        const formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Start chat session with history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 500, // Keep responses fairly concise
                temperature: 0.7
            }
        });

        // Send the user's message
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const replyText = response.text();

        res.json({
            reply: replyText,
            redirectUrl: null
        });

    } catch (error) {
        console.error('Gemini API Error:', error.message);
        
        // Provide a user-friendly message for quota issues
        if (error.message && error.message.includes('429')) {
            return res.status(429).json({
                error: 'API quota exceeded. Please try again later or update the API key.',
                message: error.message
            });
        }
        res.status(500).json({ error: 'Failed to process chat request', message: error.message });
    }
});

module.exports = router;