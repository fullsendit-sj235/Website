import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import App from './App';

describe('<App />', () => {
  // Views are lazy-loaded; warm the module cache so the first render isn't
  // racing a cold compile.
  beforeAll(async () => {
    await Promise.all([import('./views/CityDashboard'), import('./views/PersonalUsage')]);
  });

  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('opens the tab named in the URL hash', async () => {
    window.history.replaceState(null, '', '/#personal');
    render(<App />);
    expect(screen.getByRole('tab', { name: /personal usage/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(await screen.findByRole('heading', { name: 'Carbon footprint' })).toBeInTheDocument();
  });

  it('updates the URL hash when switching tabs', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('tab', { name: /personal usage/i }));
    expect(window.location.hash).toBe('#personal');
  });

  it('opens on the city dashboard', async () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: /city dashboard/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(await screen.findByText('Renewable share')).toBeInTheDocument();
  });

  it('switches to personal usage when its tab is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: /personal usage/i }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your household energy');
    expect(await screen.findByRole('heading', { name: 'Carbon footprint' })).toBeInTheDocument();
  });

  it('moves between tabs with the arrow keys', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: /city dashboard/i }));
    await user.keyboard('{ArrowRight}');

    const personal = screen.getByRole('tab', { name: /personal usage/i });
    expect(personal).toHaveAttribute('aria-selected', 'true');
    expect(personal).toHaveFocus();
  });
});
