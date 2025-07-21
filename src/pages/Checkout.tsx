import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../components/ShippingForm';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
];

const Checkout: React.FC = () => {
  const { checkoutStep, cart } = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  const renderStepContent = () => {
    switch (checkoutStep) {
      case 1:
        return <ShippingForm />;
      case 2:
        return <PaymentForm />;
      default:
        return <ShippingForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your purchase securely and quickly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Stepper */}
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol role="list" className="flex items-center">
                  {steps.map((step, stepIdx) => (
                    <li key={step.name} className="relative flex-1">
                      <div className="flex items-center text-sm font-medium">
                        <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${checkoutStep >= step.id ? 'bg-primary-600' : 'bg-gray-300'}`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </span>
                        <span className={`ml-4 ${checkoutStep >= step.id ? 'text-primary-600' : 'text-gray-500'}`}>{step.name}</span>
                      </div>
                      {stepIdx !== steps.length - 1 ? (
                        <div className={`absolute top-5 left-10 -ml-px mt-px h-0.5 w-full ${checkoutStep > step.id ? 'bg-primary-600' : 'bg-gray-300'}`} aria-hidden="true" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Step Content */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={checkoutStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
              <ShieldCheck className="w-10 h-10 text-green-500" />
              <div>
                <h4 className="font-semibold text-gray-800">Secure Checkout</h4>
                <p className="text-sm text-gray-600">Your information is protected with SSL encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
