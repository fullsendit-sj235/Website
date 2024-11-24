import React from 'react';
import { LayoutDashboard, User, Lightbulb } from 'lucide-react';
import { EnergyMixChart } from './components/EnergyMixChart';
import { RenewableAvailability } from './components/RenewableAvailability';
import { UserConsumption } from './components/UserConsumption';
import { Recommendations } from './components/Recommendations';
import { CarbonFootprint } from './components/CarbonFootprint';
import { SolarCalculator } from './components/SolarCalculator';
import { useEnergyData } from './hooks/useEnergyData';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const data = useEnergyData();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Lightbulb className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">EnergyVision</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  City Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'personal'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Personal Usage
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Energy Mix</h2>
                <EnergyMixChart data={data.cityMix} />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Renewable Energy Availability</h2>
                <RenewableAvailability data={data.renewable} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <UserConsumption 
              data={{
                consumption: data.userConsumption,
                metrics: data.metrics
              }} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CarbonFootprint carbonData={data.carbonFootprint} />
              <SolarCalculator />
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-6">Recommendations</h2>
              <Recommendations />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;