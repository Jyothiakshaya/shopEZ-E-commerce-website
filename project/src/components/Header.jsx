import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Header({ onMenuToggle, onCartToggle }) {
  const { state, dispatch } = useApp();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleUserLogin = () => {
    // Mock login - set Sarah as the user
    dispatch({ 
      type: 'SET_USER', 
      payload: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
        isAdmin: false
      }
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopEZ
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={state.searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button 
              onClick={onCartToggle}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <div className="relative">
              {state.user ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={state.user.avatar}
                    alt={state.user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {state.user.name}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleUserLogin}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm font-medium">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={state.searchQuery}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}