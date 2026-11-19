import { LayoutDashboard, User } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { Header, type TabDefinition } from './components/Header';
import { useEnergyData } from './hooks/useEnergyData';
import { useHashState } from './hooks/useHashState';
import { panelId, tabId } from './lib/tabs';

// Each view is its own chunk, loaded the first time its tab opens.
const CityDashboard = lazy(() => import('./views/CityDashboard'));
const PersonalUsage = lazy(() => import('./views/PersonalUsage'));

const TABS = [
  { id: 'city', label: 'City dashboard', icon: LayoutDashboard },
  { id: 'personal', label: 'Personal usage', icon: User },
] as const satisfies readonly TabDefinition<string>[];

type TabId = (typeof TABS)[number]['id'];
const TAB_IDS: readonly TabId[] = TABS.map((tab) => tab.id);

const PAGE_COPY: Record<TabId, { title: string; subtitle: string }> = {
  city: {
    title: 'City energy overview',
    subtitle: 'How the city is powered and when renewables are available.',
  },
  personal: {
    title: 'Your household energy',
    subtitle: 'Track usage, see your footprint and size a solar system.',
  },
};

function ViewFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Loading view">
      {[0, 1].map((i) => (
        <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200/60" />
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useHashState<TabId>(TAB_IDS, 'city');
  const snapshot = useEnergyData();
  const copy = PAGE_COPY[activeTab];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        updatedAt={snapshot.updatedAt}
      />

      <main
        id={panelId(activeTab)}
        role="tabpanel"
        aria-labelledby={tabId(activeTab)}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-1 text-slate-500">{copy.subtitle}</p>
        </div>

        <Suspense fallback={<ViewFallback />}>
          {activeTab === 'city' ? (
            <CityDashboard snapshot={snapshot} />
          ) : (
            <PersonalUsage snapshot={snapshot} />
          )}
        </Suspense>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 text-xs text-slate-400 sm:px-6 lg:px-8">
        All figures are simulated for demonstration purposes.
      </footer>
    </div>
  );
}
