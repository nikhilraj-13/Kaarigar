import express from 'express';
import { getSellerProgramInfo, applyAsSeller } from '../controllers/sellerController.js';

const router = express.Router();

router.get('/', getSellerProgramInfo);
router.post('/apply', applyAsSeller);

export default router;
