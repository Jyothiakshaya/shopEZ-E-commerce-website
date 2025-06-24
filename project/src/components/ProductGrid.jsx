import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { mockProducts } from '../data/mockData';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Load mock products
    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  // Filter products based on current filters
  const filteredProducts = state.products.filter((product) => {
    // Category filter
    if (state.currentCategory !== 'all' && product.category !== state.currentCategory) {
      return false;
    }

    // Search filter
    if (state.searchQuery) {
      const searchLower = state.searchQuery.toLowerCase();
      if (
        !product.name.toLowerCase().includes(searchLower) &&
        !product.description.toLowerCase().includes(searchLower) &&
        !product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      ) {
        return false;
      }
    }

    // Price filter
    if (product.price < state.priceRange[0] || product.price > state.priceRange[1]) {
      return false;
    }

    return true;
  });

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-8 5-8-5" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {state.currentCategory === 'all' ? 'All Products' : 
             state.currentCategory.charAt(0).toUpperCase() + state.currentCategory.slice(1)}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Customer Rating</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Recommended Products Section */}
      {state.currentCategory === 'jewelry' && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Recommended for You
            </span>
            ✨
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts
              .filter(p => p.category === 'jewelry')
              .slice(0, 3)
              .map((product) => (
                <ProductCard key={`rec-${product.id}`} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}