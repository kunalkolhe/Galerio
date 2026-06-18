import express from 'express';
import prisma from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get reviews for an editor
router.get('/:editorId', async (req, res) => {
  try {
    const editorId = parseInt(req.params.editorId);
    
    const reviews = await prisma.review.findMany({
      where: { editor_id: editorId },
      include: {
        client: {
          select: { id: true, name: true, profile_image: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    const averageRating = reviews.length > 0 
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.json({
      reviews,
      averageRating,
      totalReviews: reviews.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { editor_id, rating, comment } = req.body;
    const client_id = req.user.userId;

    if (client_id === editor_id) {
      return res.status(400).json({ error: "You cannot review yourself." });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        client_id,
        editor_id
      },
      include: {
        client: {
          select: { id: true, name: true, profile_image: true }
        }
      }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
