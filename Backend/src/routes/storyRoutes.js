import express from 'express';
import { getStories, getTestimonials } from '../controllers/storyController.js';

const router = express.Router();

router.get('/', getStories);
router.get('/testimonials', getTestimonials);

export default router;
