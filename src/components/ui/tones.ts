export type Tone = 'blue' | 'green' | 'amber' | 'slate';

interface ToneClasses {
  /** Soft background behind an icon. */
  readonly badge: string;
  /** Icon / accent text colour. */
  readonly text: string;
  /** Tinted panel background. */
  readonly panel: string;
}

export const TONES = {
  blue: { badge: 'bg-blue-100', text: 'text-blue-600', panel: 'bg-blue-50' },
  green: { badge: 'bg-emerald-100', text: 'text-emerald-600', panel: 'bg-emerald-50' },
  amber: { badge: 'bg-amber-100', text: 'text-amber-600', panel: 'bg-amber-50' },
  slate: { badge: 'bg-slate-100', text: 'text-slate-600', panel: 'bg-slate-50' },
} as const satisfies Record<Tone, ToneClasses>;
