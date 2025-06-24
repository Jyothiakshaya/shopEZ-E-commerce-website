import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Checkout({ onBack, onComplete }) {
  const { state, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    address: '456 Elm Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10018',
    country: 'United States',
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: 'Sarah Johnson',
    // Gift Option
    isGift: false,
    giftMessage: '',
    recipientName: 'Emily Davis',
    recipientAddress: '789 Oak Avenue, Brooklyn, NY 11201'
  });

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = () => {
    // Create order
    const newOrder = {
      id: Date.now().toString(),
      userId: state.user?.id || 'guest',
      items: [...state.cart],
      total: total,
      status: 'processing',
      createdAt: new Date(),
      shippingAddress: {
        street: formData.isGift ? formData.recipientAddress.split(',')[0] : formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: 'Credit Card'
    };

    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'CLEAR_CART' });
    setOrderPlaced(true);
    
    // Simulate order confirmation delay
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. {formData.isGift ? 'Your gift' : 'Your order'} will be processed shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-500">
            You'll receive an email confirmation shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Cart</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Shipping Information */}
              {currentStep >= 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-blue-600" />
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Gift Option */}
                  <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isGift"
                        checked={formData.isGift}
                        onChange={handleInputChange}
                        className="rounded text-pink-600 focus:ring-pink-500"
                      />
                      <span className="font-medium text-pink-900">This is a gift</span>
                    </label>
                    {formData.isGift && (
                      <div className="mt-3 space-y-3">
                        <input
                          type="text"
                          name="recipientName"
                          placeholder="Recipient Name"
                          value={formData.recipientName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <input
                          type="text"
                          name="recipientAddress"
                          placeholder="Recipient Address"
                          value={formData.recipientAddress}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <textarea
                          name="giftMessage"
                          placeholder="Gift message (optional)"
                          value={formData.giftMessage}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          rows="3"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep >= 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Information
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardholderName"
                      placeholder="Cardholder Name"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-6">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Delivery Information</h4>
                <p className="text-sm text-blue-700">
                  {formData.isGift ? (
                    <>Delivering to: {formData.recipientName}<br />{formData.recipientAddress}</>
                  ) : (
                    <>Delivering to: {formData.firstName} {formData.lastName}<br />{formData.address}</>
                  )}
                </p>
                <p className="text-sm text-blue-600 mt-2">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}