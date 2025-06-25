import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Package, LogOut, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ onSearch, onCartClick, onAuthClick, onOrdersClick }) {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setIsUserMenuOpen(false);
    alert('You have been logged out successfully!');
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary-700">ShopEZ</h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {state.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{state.user?.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{state.user?.name}</p>
                      <p className="text-sm text-gray-500">{state.user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                        {state.user?.role}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Add profile functionality here
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    
                    <button
                      onClick={onOrdersClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Package className="h-4 w-4" />
                      <span>My Orders</span>
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}

            <button className="text-gray-700 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>

            <button
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center justify-around">
              {state.isAuthenticated ? (
                <div className="flex flex-col items-center space-y-1">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-xs text-gray-700">{state.user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Sign In</span>
                </button>
              )}

              <button className="flex flex-col items-center space-y-1 text-gray-700 hover:text-red-500">
                <Heart className="h-5 w-5" />
                <span className="text-xs">Wishlist</span>
              </button>

              {state.isAuthenticated && (
                <button
                  onClick={onOrdersClick}
                  className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary-600"
                >
                  <Package className="h-5 w-5" />
                  <span className="text-xs">Orders</span>
                </button>
              )}

              <button
                onClick={onCartClick}
                className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary-600 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}