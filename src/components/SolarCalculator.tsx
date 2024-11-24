import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Battery } from 'lucide-react';

export const SolarCalculator: React.FC = () => {
  const [consumption, setConsumption] = useState(30);
  const [sunlightHours, setSunlightHours] = useState(5);

  const panelArea = Math.ceil((consumption * 1000) / (sunlightHours * 150));
  const batterySize = Math.ceil((consumption * 1.5) / 0.8);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-6">Solar Installation Calculator</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Energy Consumption (kWh)
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-2 text-sm text-gray-600">{consumption} kWh</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Daily Sunlight Hours
          </label>
          <input
            type="range"
            min="3"
            max="8"
            value={sunlightHours}
            onChange={(e) => setSunlightHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-2 text-sm text-gray-600">{sunlightHours} hours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <h3 className="font-medium">Required Panel Area</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{panelArea} m²</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium">Battery Capacity</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{batterySize} kWh</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};