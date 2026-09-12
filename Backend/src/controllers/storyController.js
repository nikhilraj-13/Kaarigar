import { CRAFT_STORIES, TESTIMONIALS } from '../models/orderModel.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getStories = (req, res, next) => {
  try {
    return ApiResponse.success(res, CRAFT_STORIES, 'Craft stories retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getTestimonials = (req, res, next) => {
  try {
    return ApiResponse.success(res, TESTIMONIALS, 'Testimonials retrieved successfully');
  } catch (error) {
    next(error);
  }
};
