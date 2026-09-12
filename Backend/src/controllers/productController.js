import { PRODUCTS, CATEGORIES } from '../models/productModel.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getProducts = (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      location,
      material,
      artisanId,
      featured,
      sort
    } = req.query;

    let filtered = [...PRODUCTS];

    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));

    if (location) {
      const locations = Array.isArray(location) ? location : [location];
      filtered = filtered.filter(p => locations.some(loc => p.location.toLowerCase().includes(loc.toLowerCase())));
    }

    if (material) {
      const materials = Array.isArray(material) ? material : [material];
      filtered = filtered.filter(p => materials.some(mat => p.material.toLowerCase().includes(mat.toLowerCase())));
    }

    if (artisanId) filtered = filtered.filter(p => p.artisanId === artisanId);
    if (featured === 'true') filtered = filtered.filter(p => p.featured);

    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);

    return ApiResponse.success(res, filtered, 'Products retrieved successfully', 200, {
      count: filtered.length,
      totalAvailable: PRODUCTS.length
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdOrSlug = (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const product = PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug);

    if (!product) {
      return ApiResponse.error(res, 'Handmade craft item not found', 404);
    }

    const relatedProducts = PRODUCTS
      .filter(p => p.id !== product.id && (p.category === product.category || p.artisanId === product.artisanId))
      .slice(0, 4);

    return ApiResponse.success(res, { ...product, relatedProducts }, 'Product details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getCategories = (req, res, next) => {
  try {
    const categoriesWithCount = CATEGORIES.map(cat => {
      const count = cat.id === 'all'
        ? PRODUCTS.length
        : PRODUCTS.filter(p => p.category === cat.id).length;
      return { ...cat, itemCount: count };
    });

    return ApiResponse.success(res, categoriesWithCount, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
};
