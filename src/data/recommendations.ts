import { Lightbulb, Sun, Wind, type LucideIcon } from 'lucide-react';

interface RecommendationBase {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: LucideIcon;
  readonly tone: 'amber' | 'blue' | 'green';
}

/** An upgrade with a cost and a return. */
export interface InvestmentRecommendation extends RecommendationBase {
  readonly kind: 'investment';
  readonly upfrontCost: number;
  readonly annualSavings: number;
}

/** Low-cost habits and fixes. */
export interface TipsRecommendation extends RecommendationBase {
  readonly kind: 'tips';
  readonly tips: readonly string[];
}

export type Recommendation = InvestmentRecommendation | TipsRecommendation;

export const RECOMMENDATIONS: readonly Recommendation[] = [
  {
    id: 'solar',
    kind: 'investment',
    title: 'Solar installation',
    summary: 'Rooftop panels could cut your energy bill by up to 50%.',
    icon: Sun,
    tone: 'amber',
    upfrontCost: 12_000,
    annualSavings: 1_800,
  },
  {
    id: 'wind',
    kind: 'investment',
    title: 'Small wind turbine',
    summary: 'A home turbine can supplement solar on cloudy, windy days.',
    icon: Wind,
    tone: 'blue',
    upfrontCost: 8_000,
    annualSavings: 1_200,
  },
  {
    id: 'efficiency',
    kind: 'tips',
    title: 'Energy efficiency',
    summary: 'Simple changes that lower consumption with little upfront cost.',
    icon: Lightbulb,
    tone: 'green',
    tips: [
      'Replace old appliances with energy-efficient models',
      'Switch to LED lighting throughout your home',
      'Improve insulation and seal drafts',
    ],
  },
];
