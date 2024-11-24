import { useState, useEffect } from 'react';

interface EnergyData {
  cityMix: {
    name: string;
    value: number;
    color: string;
  }[];
  renewable: {
    hour: number;
    solar: number;
    wind: number;
  }[];
  userConsumption: {
    day: string;
    consumption: number;
  }[];
  metrics: {
    dailyUsage: number;
    carbonOffset: number;
    efficiency: number;
  };
  carbonFootprint: {
    total: number;
    breakdown: {
      source: string;
      amount: number;
      color: string;
    }[];
  };
}

export const useEnergyData = () => {
  const [data, setData] = useState<EnergyData>({
    cityMix: [
      { name: 'Coal', value: 30, color: '#374151' },
      { name: 'Solar', value: 25, color: '#FCD34D' },
      { name: 'Wind', value: 20, color: '#60A5FA' },
      { name: 'Hydro', value: 15, color: '#34D399' },
      { name: 'Nuclear', value: 10, color: '#F87171' },
    ],
    renewable: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      solar: Math.sin((i - 6) * Math.PI / 12) * 50 + 50,
      wind: Math.random() * 30 + 40,
    })).map(item => ({
      ...item,
      solar: item.hour >= 6 && item.hour <= 18 ? Math.max(0, item.solar) : 0,
    })),
    userConsumption: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      consumption: Math.random() * 20 + 15,
    })),
    metrics: {
      dailyUsage: 17.8,
      carbonOffset: 12.5,
      efficiency: 85,
    },
    carbonFootprint: {
      total: 6200,
      breakdown: [
        { source: 'Grid Electricity', amount: 4000, color: '#374151' },
        { source: 'Natural Gas', amount: 1500, color: '#F59E0B' },
        { source: 'Transportation', amount: 700, color: '#3B82F6' },
      ],
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        renewable: prev.renewable.map(hour => ({
          ...hour,
          wind: Math.random() * 30 + 40,
        })),
        metrics: {
          ...prev.metrics,
          dailyUsage: +(Math.random() * 5 + 15).toFixed(1),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
};