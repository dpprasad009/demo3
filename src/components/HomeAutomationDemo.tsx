import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Thermometer, Wind, Tv } from 'lucide-react';

const HomeAutomationDemo: React.FC = () => {
  const [lightsOn, setLightsOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(2);
  const [tvOn, setTvOn] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gray-100 p-6 rounded-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Lights Control */}
        <div className={`p-4 rounded-lg transition-colors ${lightsOn ? 'bg-yellow-200' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className={`w-6 h-6 ${lightsOn ? 'text-yellow-500' : 'text-gray-400'}`} />
              <span className="font-medium">Living Room Lights</span>
            </div>
            <button
              onClick={() => setLightsOn(!lightsOn)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${lightsOn ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${lightsOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* TV Control */}
        <div className={`p-4 rounded-lg transition-colors ${tvOn ? 'bg-blue-200' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tv className={`w-6 h-6 ${tvOn ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-medium">Entertainment System</span>
            </div>
            <button
              onClick={() => setTvOn(!tvOn)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${tvOn ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tvOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Thermostat */}
        <div className="p-4 bg-white rounded-lg col-span-2">
          <div className="flex items-center space-x-2 mb-2">
            <Thermometer className="w-6 h-6 text-red-500" />
            <span className="font-medium">Thermostat</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{temperature}°C</span>
            <input
              type="range"
              min="16"
              max="30"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-1/2"
            />
          </div>
        </div>

        {/* Fan Control */}
        <div className="p-4 bg-white rounded-lg col-span-2">
          <div className="flex items-center space-x-2 mb-2">
            <Wind className="w-6 h-6 text-blue-500" />
            <span className="font-medium">Fan Speed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold">Level: {fanSpeed}</span>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map(speed => (
                <button
                  key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`w-10 h-10 rounded-full transition-colors ${fanSpeed === speed ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeAutomationDemo;
