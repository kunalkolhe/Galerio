import express from 'express';
import { uploadCloudinary } from '../cloudinary.js';
import prisma from '../db.js';
import path from 'path';
import fs from 'fs';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const galleries = await prisma.gallery.findMany({ 
      include: { category: true, creator: { select: { name: true, profile_image: true } } },
      orderBy: { created_at: 'desc' }
    });
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const galleries = await prisma.gallery.findMany({ 
      where: { created_by: req.user.userId },
      include: { category: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        name: true, 
        email: true,
        profile_image: true, 
        role: true,
        address: true,
        contact_phone: true,
        editor_type: true,
        charges: true,
        bio: true,
        instagram: true,
        youtube: true,
        website: true,
        other_link: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const galleries = await prisma.gallery.findMany({ 
      where: { created_by: userId },
      include: { category: true },
      orderBy: { created_at: 'desc' }
    });

    res.json({ user, galleries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, uploadCloudinary.fields([{ name: 'before_image', maxCount: 1 }, { name: 'after_image', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, price, category_id, work_type, work_category } = req.body;
    
    if (!req.files || !req.files.before_image) {
      return res.status(400).json({ error: 'A primary file (image or video) is required.' });
    }

    const before_image = req.files.before_image[0].path; // Cloudinary URL
    let after_image = null;
    
    if (req.files.after_image && req.files.after_image[0]) {
       after_image = req.files.after_image[0].path; // Cloudinary URL
    }

    if (work_type === 'LUTs' && !after_image) {
      return res.status(400).json({ error: 'An after image is required for LUTs.' });
    }

    const gallery = await prisma.gallery.create({
      data: {
        title,
        description,
        price,
        before_image,
        after_image,
        work_type: work_type || 'Photography',
        work_category,
        category_id: category_id ? parseInt(category_id) : null,
        created_by: req.user.userId
      }
    });

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const gallery = await prisma.gallery.findUnique({ where: { id } });

    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    // Only allow creator (or ADMIN) to delete
    if (gallery.created_by !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to delete this gallery' });
    }

    // On Vercel (stateless) or with Cloudinary, we don't delete from local disk.
    // If you want to delete from Cloudinary, you would use cloudinary.uploader.destroy()
    // For now, we just skip local deletion since it's cloud-hosted.

    await prisma.gallery.delete({ where: { id } });
    res.json({ message: 'Gallery deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
