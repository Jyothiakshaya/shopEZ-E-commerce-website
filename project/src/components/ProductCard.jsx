import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function ProductCard({ product }) {
  const { dispatch } = useApp();

  const addToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>

        {/* Quick Add to Cart */}
        <button
          onClick={addToCart}
          className="absolute bottom-3 left-3 right-3 bg-blue-600 text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-700 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="font-medium">Add to Cart</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Seller */}
        <p className="text-xs text-gray-500 mb-1">{product.seller}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          
          <button
            onClick={addToCart}
            disabled={!product.inStock}
            className="md:hidden px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}