import express from 'express';
import multer from 'multer';
import prisma from '../db.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const galleries = await prisma.gallery.findMany({ 
      include: { category: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.fields([{ name: 'before_image', maxCount: 1 }, { name: 'after_image', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, price, category_id, created_by } = req.body;
    
    if (!req.files || !req.files.before_image || !req.files.after_image) {
      return res.status(400).json({ error: 'Both before and after images are required.' });
    }

    const before_image = '/uploads/' + req.files.before_image[0].filename;
    const after_image = '/uploads/' + req.files.after_image[0].filename;

    const gallery = await prisma.gallery.create({
      data: {
        title,
        description,
        price,
        before_image,
        after_image,
        category_id: category_id ? parseInt(category_id) : null,
        created_by: created_by ? parseInt(created_by) : 1
      }
    });

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
