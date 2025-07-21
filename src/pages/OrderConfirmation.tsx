import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { CheckCircle, Package, Home, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  const { shippingAddress, items, total, createdAt } = order;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
          <p className="mt-2 text-lg text-gray-600">Your order has been placed successfully.</p>
          <p className="mt-1 text-sm text-gray-500">Order ID: <span className="font-medium text-gray-700">{order.id}</span></p>
        </div>

        <div className="border-t border-b border-gray-200 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Package className="w-6 h-6 mr-3 text-primary-600"/>Order Summary</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
          <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{shippingAddress.name}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">Order placed on: {new Date(createdAt).toLocaleDateString()}</p>
          <p className="text-gray-600 mt-1">You will receive an email confirmation shortly.</p>
          <Link
            to="/products"
            className="mt-6 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
