import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, AlertTriangle } from 'lucide-react';

interface Props {
  carbonData: {
    total: number;
    breakdown: {
      source: string;
      amount: number;
      color: string;
    }[];
  };
}

export const CarbonFootprint: React.FC<Props> = ({ carbonData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-lg font-semibold">Carbon Footprint</h2>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-3xl font-bold text-gray-900">{carbonData.total}</p>
          <p className="text-sm text-gray-500">kg CO2 per year</p>
        </div>
        {carbonData.total > 5000 && (
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">Above average</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {carbonData.breakdown.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.source}</span>
              <span className="font-medium">{item.amount} kg</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.amount / carbonData.total) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};