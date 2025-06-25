import React from 'react';
import { ShoppingBag, Truck, Shield, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to ShopEZ
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
            Your one-stop destination for effortless online shopping. Discover amazing products, 
            enjoy seamless checkout, and experience the future of e-commerce.
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Shopping Now
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-in">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Effortless Discovery</h3>
            <p className="text-sm opacity-90">Find exactly what you're looking for with our smart search and filtering.</p>
          </div>

          <div className="text-center animate-fade-in">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm opacity-90">Get your orders delivered quickly with our reliable shipping partners.</p>
          </div>

          <div className="text-center animate-fade-in">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
            <p className="text-sm opacity-90">Shop with confidence using our encrypted and secure payment system.</p>
          </div>

          <div className="text-center animate-fade-in">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
            <p className="text-sm opacity-90">Curated selection of high-quality products from trusted sellers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}