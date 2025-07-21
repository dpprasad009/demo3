import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const OrderSummary: React.FC = () => {
  const { cart, getCartTotal } = useStore();
  const subtotal = getCartTotal();
  const shippingCost = subtotal > 7999 ? 0 : 500;
  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h3>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.product.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-gray-700 text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
