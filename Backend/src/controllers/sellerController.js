import { sellerApplications } from '../models/orderModel.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getSellerProgramInfo = (req, res, next) => {
  try {
    return ApiResponse.success(res, {
      totalApplications: sellerApplications.length,
      benefits: [
        '0% platform commission for traditional certified master artisans',
        'Free slow-photography and workshop storytelling crew visit',
        '100% upfront material advance for batch creations',
        'Plastic-free artisan packaging provided free'
      ]
    }, 'Seller program details retrieved');
  } catch (error) {
    next(error);
  }
};

export const applyAsSeller = (req, res, next) => {
  try {
    const { name, craftType, location, phone, email, experienceYears, workshopStory } = req.body;

    if (!name || !craftType || !location || !phone) {
      return ApiResponse.error(res, 'Name, craft specialty, workshop location, and phone number are required.', 400);
    }

    const application = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      name,
      craftType,
      location,
      phone,
      email: email || '',
      experienceYears: experienceYears || '1',
      workshopStory: workshopStory || '',
      status: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString()
    };

    sellerApplications.push(application);

    return ApiResponse.success(
      res,
      application,
      'Artisan application received with honor! Our slow-craft team will visit/call you within 48 hours.',
      201
    );
  } catch (error) {
    next(error);
  }
};
