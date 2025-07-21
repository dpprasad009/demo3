import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard, ArrowLeft, Smartphone, Landmark, HandCoins } from 'lucide-react';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'cod';

type PaymentFormInputs = {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
  upiId?: string;
  bank?: string;
};

const paymentOptions = [
  { id: 'card' as PaymentMethod, name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi' as PaymentMethod, name: 'UPI', icon: Smartphone },
  { id: 'netbanking' as PaymentMethod, name: 'Net Banking', icon: Landmark },
  { id: 'cod' as PaymentMethod, name: 'Cash on Delivery', icon: HandCoins },
];

const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank'];

const PaymentForm: React.FC = () => {
  const { placeOrder, setCheckoutStep } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('card');
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInputs>();

  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    console.log('Payment Data:', { method: paymentMethod, ...data });
    // Simulate payment processing
    const newOrder = await placeOrder();
    if (newOrder) {
      navigate(`/order-confirmation/${newOrder.id}`);
    } else {
      // Handle error case, e.g., show a notification
      alert('There was an issue placing your order. Please try again.');
    }
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                {...register('cardholderName', { required: paymentMethod === 'card' ? 'Cardholder name is required' : false })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
              {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>}
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  {...register('cardNumber', {
                    required: paymentMethod === 'card' ? 'Card number is required' : false,
                    pattern: { value: /^\d{16}$/, message: 'Invalid card number (must be 16 digits)' }
                  })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0000 0000 0000 0000"
                />
                <CreditCard className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  {...register('expiryDate', {
                    required: paymentMethod === 'card' ? 'Expiry date is required' : false,
                    pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Invalid format (MM/YY)' }
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  {...register('cvc', {
                    required: paymentMethod === 'card' ? 'CVC is required' : false,
                    pattern: { value: /^\d{3,4}$/, message: 'Invalid CVC' }
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123"
                />
                {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc.message}</p>}
              </div>
            </div>
          </motion.div>
        );
      case 'upi':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
              <input
                type="text"
                id="upiId"
                {...register('upiId', { required: paymentMethod === 'upi' ? 'UPI ID is required' : false })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="yourname@bank"
              />
              {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId.message}</p>}
            </div>
            <p className="text-sm text-gray-500">You will receive a payment request on your UPI app.</p>
          </motion.div>
        );
      case 'netbanking':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Select Bank</label>
              <select
                id="bank"
                {...register('bank', { required: paymentMethod === 'netbanking' ? 'Please select a bank' : false })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">-- Select your bank --</option>
                {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
              </select>
              {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank.message}</p>}
            </div>
            <p className="text-sm text-gray-500">You will be redirected to your bank's secure login page.</p>
          </motion.div>
        );
      case 'cod':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">You have selected Cash on Delivery.</p>
            <p className="text-sm text-gray-500 mt-1">Please pay the delivery agent upon receiving your order.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
      
      {/* Payment Method Tabs */}
      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {paymentOptions.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => setPaymentMethod(option.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
              paymentMethod === option.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <option.icon className={`w-6 h-6 mb-1 ${paymentMethod === option.id ? 'text-primary-600' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${paymentMethod === option.id ? 'text-primary-700' : 'text-gray-700'}`}>{option.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {renderPaymentFields()}

        <div className="pt-6 space-y-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Lock className="w-5 h-5" />
            <span>{paymentMethod === 'cod' ? 'Place Order' : 'Pay Securely'}</span>
          </button>
          <button
            type="button"
            onClick={() => setCheckoutStep(1)}
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shipping</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
