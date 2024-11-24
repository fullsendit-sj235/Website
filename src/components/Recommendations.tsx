import React from 'react';
import { Sun, Wind, Lightbulb } from 'lucide-react';

export const Recommendations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="p-3 bg-yellow-100 rounded-lg w-fit">
          <Sun className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Solar Installation</h3>
        <p className="text-gray-600 mb-4">
          Installing solar panels could reduce your energy bills by up to 50%
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Initial Cost</span>
            <span className="font-semibold">$12,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Annual Savings</span>
            <span className="font-semibold">$1,800</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Break-even</span>
            <span className="font-semibold">6.7 years</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="p-3 bg-blue-100 rounded-lg w-fit">
          <Wind className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Wind Energy</h3>
        <p className="text-gray-600 mb-4">
          Small wind turbines can supplement your energy needs
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Initial Cost</span>
            <span className="font-semibold">$8,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Annual Savings</span>
            <span className="font-semibold">$1,200</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Break-even</span>
            <span className="font-semibold">6.7 years</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="p-3 bg-green-100 rounded-lg w-fit">
          <Lightbulb className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Energy Efficiency</h3>
        <p className="text-gray-600 mb-4">
          Simple changes that can reduce your energy consumption
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Replace old appliances with energy-efficient models
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Install LED lighting throughout your home
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Improve home insulation
          </li>
        </ul>
      </div>
    </div>
  );
};