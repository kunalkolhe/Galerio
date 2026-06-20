import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db.js';
import authMiddleware from '../middleware/auth.js';
import { uploadCloudinary } from '../cloudinary.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password_hash, role: role || 'CLIENT' }
    });
    
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      process.env.JWT_SECRET || 'supersecret', 
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true, address: true, contact_phone: true, editor_type: true, charges: true, bio: true, profile_image: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', authMiddleware, uploadCloudinary.single('profile_image'), async (req, res) => {
  let { name, address, contact_phone, editor_type, charges, bio, instagram, youtube, website, other_link, remove_profile_image } = req.body;
  try {
    // Process bio into paragraphs if it's not already
    if (bio && typeof bio === 'string') {
      try {
        JSON.parse(bio); // Test if it's already a JSON array
      } catch {
        bio = JSON.stringify(bio.split('\n').filter(p => p.trim()));
      }
    }

    const updateData = {
      name,
      address,
      contact_phone
    };

    if (req.user.role !== 'CLIENT') {
      updateData.editor_type = editor_type;
      updateData.charges = charges;
      updateData.bio = bio;
      updateData.instagram = instagram;
      updateData.youtube = youtube;
      updateData.website = website;
      updateData.other_link = other_link;
    }

    if (remove_profile_image === 'true' || remove_profile_image === true) {
      updateData.profile_image = null;
    } else if (req.file) {
      updateData.profile_image = req.file.path; // Cloudinary URL
    }

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, address: true, contact_phone: true, editor_type: true, charges: true, bio: true, instagram: true, youtube: true, website: true, other_link: true, profile_image: true }
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.put('/password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Incorrect current password' });

    const password_hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password_hash }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
