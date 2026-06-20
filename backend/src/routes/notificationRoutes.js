import express from 'express';
import prisma from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all notifications for the logged in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: req.user.userId },
      orderBy: { created_at: 'desc' }
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark a notification as read
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: parseInt(req.params.id) },
      data: { is_read: true }
    });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new notification (e.g. "Hire Me" request)
// This does not require authMiddleware since clients might not be logged in to send a request, 
// or if they are, we can still just take their info from the body.
router.post('/hire', async (req, res) => {
  const { editor_id, content, from_name, from_email, from_phone } = req.body;
  if (!editor_id || !content || !from_name || !from_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        user_id: parseInt(editor_id),
        type: 'HIRE_REQUEST',
        content,
        from_name,
        from_email,
        from_phone
      }
    });
    res.status(201).json({ message: 'Request sent successfully!', notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
