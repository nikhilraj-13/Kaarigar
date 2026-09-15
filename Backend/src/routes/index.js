import express from 'express';
import productRoutes from './productRoutes.js';
import artisanRoutes from './artisanRoutes.js';
import orderRoutes from './orderRoutes.js';
import storyRoutes from './storyRoutes.js';
import sellerRoutes from './sellerRoutes.js';
import { getCategories } from '../controllers/productController.js';
import { getTestimonials } from '../controllers/storyController.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/artisans', artisanRoutes);
router.use('/orders', orderRoutes);
router.use('/stories', storyRoutes);
router.use('/sellers', sellerRoutes);
router.use('/categories', getCategories);
router.use('/testimonials', getTestimonials);

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Kaarigar Universal Backend API',
    platformsSupported: ['Web (React.js)', 'Mobile (React Native / Flutter / Android / iOS)']
  });
});

export default router;
