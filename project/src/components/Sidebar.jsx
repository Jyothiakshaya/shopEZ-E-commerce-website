import React from 'react';
import { X, Grid3x3, Gem, ShoppingBag, Shirt, Clock, Smartphone, Home } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { mockCategories } from '../data/mockData';

const iconMap = {
  Grid3x3,
  Gem,
  ShoppingBag,
  Shirt,
  Clock,
  Smartphone,
  Home
};

export default function Sidebar({ isOpen, onClose }) {
  const { state, dispatch } = useApp();

  const handleCategorySelect = (categoryId) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
    onClose();
  };

  const handlePriceRangeChange = (range) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: range });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {mockCategories.map((category) => {
                  const IconComponent = iconMap[category.icon];
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        state.currentCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-3">
                {[
                  { label: 'Under $50', range: [0, 50] },
                  { label: '$50 - $100', range: [50, 100] },
                  { label: '$100 - $200', range: [100, 200] },
                  { label: '$200 - $500', range: [200, 500] },
                  { label: 'Over $500', range: [500, 1000] }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handlePriceRangeChange(option.range)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      state.priceRange[0] === option.range[0] && state.priceRange[1] === option.range[1]
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: 'all' });
                dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 1000] });
                dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}