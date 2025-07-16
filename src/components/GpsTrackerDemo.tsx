import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface GpsTrackerDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const GpsTrackerDemo: React.FC<GpsTrackerDemoProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">Live Tracking Demo</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png" 
                  alt="Map background"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute"
                    animate={{
                      x: [20, 250, 250, 480, 480, 20],
                      y: [30, 30, 250, 250, 50, 30],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <MapPin className="w-8 h-8 text-red-500 fill-current" />
                    <span className="absolute -top-6 -right-10 bg-white text-xs px-2 py-1 rounded shadow">
                      Vehicle #1
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="mt-4 text-center text-gray-600">
                <p>This is a simulation of real-time GPS tracking.</p>
                <p className="text-sm">The device updates its location every few seconds.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GpsTrackerDemo;
