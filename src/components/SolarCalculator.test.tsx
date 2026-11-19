import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SolarCalculator } from './SolarCalculator';

describe('<SolarCalculator />', () => {
  it('shows the sizing for the default inputs', () => {
    render(<SolarCalculator />);
    expect(screen.getByText('40 m²')).toBeInTheDocument();
    expect(screen.getByText('57 kWh')).toBeInTheDocument();
  });

  it('recalculates when the sliders move', () => {
    render(<SolarCalculator />);
    fireEvent.change(screen.getByLabelText('Daily energy use'), { target: { value: '60' } });
    fireEvent.change(screen.getByLabelText('Average sunlight'), { target: { value: '8' } });

    // 60 kWh * 1000 / (8 h * 150 W/m²) = 50 m²; 60 * 1.5 / 0.8 = 112.5 → 113 kWh
    expect(screen.getByText('50 m²')).toBeInTheDocument();
    expect(screen.getByText('113 kWh')).toBeInTheDocument();
  });
});
