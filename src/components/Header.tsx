import { Zap, type LucideIcon } from 'lucide-react';
import { useRef, type KeyboardEvent } from 'react';
import { formatTime } from '../lib/format';
import { panelId, tabId } from '../lib/tabs';

export interface TabDefinition<Id extends string> {
  readonly id: Id;
  readonly label: string;
  readonly icon: LucideIcon;
}

interface HeaderProps<Id extends string> {
  readonly tabs: readonly TabDefinition<Id>[];
  readonly activeTab: Id;
  readonly onTabChange: (id: Id) => void;
  readonly updatedAt: Date;
}

export function Header<Id extends string>({
  tabs,
  activeTab,
  onTabChange,
  updatedAt,
}: HeaderProps<Id>) {
  const tabRefs = useRef(new Map<Id, HTMLButtonElement>());

  // Left/right arrow keys move between tabs, as in the WAI-ARIA tabs pattern.
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    if (!next) return;
    onTabChange(next.id);
    tabRefs.current.get(next.id)?.focus();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 p-2 shadow-sm">
            <Zap aria-hidden className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">EnergyVision</span>
        </div>

        <div
          role="tablist"
          aria-label="Dashboard views"
          className="order-last flex w-full gap-1 rounded-xl bg-slate-100 p-1 sm:order-none sm:w-auto"
        >
          {tabs.map(({ id, label, icon: Icon }, index) => {
            const selected = id === activeTab;
            return (
              <button
                key={id}
                ref={(element) => {
                  if (element) tabRefs.current.set(id, element);
                  else tabRefs.current.delete(id);
                }}
                id={tabId(id)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  onTabChange(id);
                }}
                onKeyDown={(event) => {
                  handleKeyDown(event, index);
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none ${
                  selected
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon aria-hidden className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <p className="flex items-center gap-2 text-xs text-slate-500" aria-live="off">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Simulated live data · {formatTime(updatedAt)}
        </p>
      </div>
    </header>
  );
}
