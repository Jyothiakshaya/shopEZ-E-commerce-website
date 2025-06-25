import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import Cart from './components/Cart';
import Orders from './components/Orders';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import ProductOrderModal from './components/ProductOrderModal';
import SellerDashboard from './components/SellerDashboard';
import { products } from './data/products';

function AppContent() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductOrderOpen, setIsProductOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // In a real app, this would navigate to a product details page
    console.log('Product clicked:', product);
  };

  const handleOrderClick = (product) => {
    if (!state.isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedProduct(product);
    setIsProductOrderOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (!state.isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/seller/*" element={
            state.isAuthenticated && state.user?.role === 'seller' ? (
              <SellerDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          
          <Route path="/" element={
            <>
              <Header
                onSearch={setSearchQuery}
                onCartClick={() => setIsCartOpen(true)}
                onAuthClick={() => setIsAuthModalOpen(true)}
                onOrdersClick={() => setIsOrdersOpen(true)}
              />

              <main>
                <Hero />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                      <FilterSidebar
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {filteredProducts.length} products found
                        </p>
                      </div>

                      <ProductGrid
                        products={filteredProducts}
                        onProductClick={handleProductClick}
                        onOrderClick={handleOrderClick}
                      />
                    </div>
                  </div>
                </div>
              </main>

              <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckout}
              />

              <Orders
                isOpen={isOrdersOpen}
                onClose={() => setIsOrdersOpen(false)}
              />

              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
              />

              <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
              />

              <ProductOrderModal
                isOpen={isProductOrderOpen}
                onClose={() => setIsProductOrderOpen(false)}
                product={selectedProduct}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;