import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onProductClick, onOrderClick }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
          onOrderClick={onOrderClick}
        />
      ))}
    </div>
  );
}