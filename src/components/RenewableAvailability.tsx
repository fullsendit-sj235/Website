import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{
    hour: number;
    solar: number;
    wind: number;
  }>;
}

export const RenewableAvailability: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="solar" stroke="#FCD34D" strokeWidth={2} />
          <Line type="monotone" dataKey="wind" stroke="#60A5FA" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};