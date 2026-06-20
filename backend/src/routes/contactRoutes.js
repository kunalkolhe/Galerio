import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json({ message: 'Message sent successfully', contactMessage });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
