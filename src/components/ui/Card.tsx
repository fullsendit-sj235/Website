import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { TONES, type Tone } from './tones';

interface CardProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly tone?: Tone;
  /** Optional element shown at the top-right of the header. */
  readonly aside?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({
  title,
  description,
  icon: Icon,
  tone = 'blue',
  aside,
  className = '',
  children,
}: CardProps) {
  const headingId = `card-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <motion.section
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ${className}`}
    >
      <header className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className={`rounded-xl p-2 ${TONES[tone].badge}`}>
              <Icon aria-hidden className={`h-5 w-5 ${TONES[tone].text}`} />
            </span>
          )}
          <div>
            <h2 id={headingId} className="text-base font-semibold text-slate-900">
              {title}
            </h2>
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
        </div>
        {aside}
      </header>
      {children}
    </motion.section>
  );
}
