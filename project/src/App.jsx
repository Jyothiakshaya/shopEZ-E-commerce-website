import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('shop');
  const { state, dispatch } = useApp();

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleCheckoutComplete = () => {
    setCurrentView('shop');
    setCartOpen(false);
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  // Auto-login admin for demo purposes
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      dispatch({
        type: 'SET_USER',
        payload: {
          id: '2',
          name: 'Admin User',
          email: 'admin@shopez.com',
          avatar: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg',
          isAdmin: true
        }
      });
    }
  }, [dispatch]);

  if (currentView === 'checkout') {
    return (
      <Checkout 
        onBack={handleBackToShop}
        onComplete={handleCheckoutComplete}
      />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <Header 
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onCartToggle={() => setCartOpen(!cartOpen)}
            />
            
            <div className="flex">
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
              
              <main className="flex-1 md:ml-80 p-6">
                <ProductGrid />
              </main>
            </div>

            <Cart 
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
              onCheckout={handleCheckout}
            />
          </div>
        } />
      </Routes>
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