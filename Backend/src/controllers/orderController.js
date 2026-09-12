import { PRODUCTS } from '../models/productModel.js';
import { ordersDatabase } from '../models/orderModel.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { FREE_SHIPPING_THRESHOLD, ARTISAN_DIRECT_SHARE_PERCENT } from '../config/constants.js';

export const createOrder = (req, res, next) => {
  try {
    const {
      customer,
      items,
      paymentMethod = 'UPI_RAZORPAY',
      couponCode,
      notes
    } = req.body;

    if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      return ApiResponse.error(res, 'Complete customer shipping address and phone number are required.', 400);
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return ApiResponse.error(res, 'Order must contain at least one craft item.', 400);
    }

    const populatedItems = items.map(item => {
      const match = PRODUCTS.find(p => p.id === item.id);
      const price = match ? match.price : (item.price || 1000);
      const name = match ? match.name : (item.name || 'Handmade Item');
      const image = match ? match.primaryImage : item.image;
      const artisanName = match ? match.artisanName : (item.artisanName || 'Master Maker');
      const location = match ? match.location : (item.location || 'India');

      return {
        id: item.id,
        name,
        artisanName,
        location,
        image,
        price,
        quantity: item.quantity || 1,
        total: price * (item.quantity || 1)
      };
    });

    const subtotal = populatedItems.reduce((sum, item) => sum + item.total, 0);

    let discountPercent = 0;
    if (couponCode && (couponCode.toUpperCase() === 'SLOWCRAFT10' || couponCode.toUpperCase() === 'ARTISAN10')) {
      discountPercent = 10;
    } else if (couponCode && couponCode.toUpperCase() === 'KAARIGAR15') {
      discountPercent = 15;
    }
    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
    const finalAmount = subtotal - discountAmount + shippingFee;

    const orderId = `KG-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const deliveryEstimateDate = new Date();
    deliveryEstimateDate.setDate(deliveryEstimateDate.getDate() + 4);

    const order = {
      orderId,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryEstimateDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customer,
      items: populatedItems,
      pricing: {
        subtotal,
        discountPercent,
        discountAmount,
        shippingFee,
        finalAmount,
        currency: 'INR'
      },
      payment: {
        method: paymentMethod,
        status: 'PAID_TEST_MODE',
        transactionRef: `TXN_TEST_${Date.now().toString().slice(-8)}`
      },
      timeline: [
        {
          stage: 'Order Confirmed',
          timestamp: 'Just now',
          description: 'Payment verified. Artisan notified in their workshop.',
          done: true
        },
        {
          stage: 'Hand-Curing & Inspection',
          timestamp: 'Tomorrow',
          description: 'Final quality check and stamp of authenticity.',
          done: false
        },
        {
          stage: 'Plastic-Free Banana Packaging',
          timestamp: 'In 2 days',
          description: 'Cushioned in shredded honeycomb paper & coir.',
          done: false
        },
        {
          stage: 'Dispatched via Carbon-Neutral Courier',
          timestamp: 'In 3 days',
          description: 'Tracking link sent to customer phone.',
          done: false
        },
        {
          stage: 'Delivered',
          timestamp: `Estimated by ${deliveryEstimateDate.toLocaleDateString()}`,
          description: 'Unbox with slow love!',
          done: false
        }
      ],
      artisanImpact: {
        directArtisanPayout: Math.round((subtotal * ARTISAN_DIRECT_SHARE_PERCENT) / 100),
        message: `${ARTISAN_DIRECT_SHARE_PERCENT}% of this purchase goes directly to master artisan households.`
      },
      notes: notes || ''
    };

    ordersDatabase.unshift(order);

    return ApiResponse.success(res, order, 'Slow-crafted order placed successfully!', 201);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = ordersDatabase.find(o => o.orderId === orderId);

    if (!order) {
      return ApiResponse.error(res, 'Order not found', 404);
    }

    return ApiResponse.success(res, order, 'Order details retrieved successfully');
  } catch (error) {
    next(error);
  }
};
