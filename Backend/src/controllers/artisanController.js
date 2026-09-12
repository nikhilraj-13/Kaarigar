import { ARTISANS } from '../models/artisanModel.js';
import { PRODUCTS } from '../models/productModel.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getArtisans = (req, res, next) => {
  try {
    const list = ARTISANS.map(artisan => {
      const artisanProducts = PRODUCTS.filter(p => p.artisanId === artisan.id);
      return {
        ...artisan,
        liveProductsCount: artisanProducts.length,
        sampleProducts: artisanProducts.slice(0, 3)
      };
    });

    return ApiResponse.success(res, list, 'Artisans retrieved successfully', 200, { count: list.length });
  } catch (error) {
    next(error);
  }
};

export const getArtisanById = (req, res, next) => {
  try {
    const { id } = req.params;
    const artisan = ARTISANS.find(a => a.id === id);

    if (!artisan) {
      return ApiResponse.error(res, 'Artisan not found', 404);
    }

    const artisanProducts = PRODUCTS.filter(p => p.artisanId === artisan.id);

    return ApiResponse.success(res, {
      ...artisan,
      products: artisanProducts
    }, 'Artisan details retrieved successfully');
  } catch (error) {
    next(error);
  }
};
