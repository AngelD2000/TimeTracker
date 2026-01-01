/**
 * Mock data for development
 * Replace with real API calls when backend is ready
 */

import type { WeekSummary, Transaction, BudgetWithStats } from '@/app/types';

export const mockBudgets: BudgetWithStats[] = [
  { id: 1, weekId: 1, category: 'Work', allocated: 40, spent: 32, remaining: 8 },
  { id: 2, weekId: 1, category: 'Sleep', allocated: 56, spent: 49, remaining: 7 },
  { id: 3, weekId: 1, category: 'Learning', allocated: 10, spent: 8, remaining: 2 },
  { id: 4, weekId: 1, category: 'Friends & Family', allocated: 14, spent: 12, remaining: 2 },
  { id: 5, weekId: 1, category: 'Personal', allocated: 20, spent: 15, remaining: 5 },
  { id: 6, weekId: 1, category: 'Exercise', allocated: 7, spent: 5, remaining: 2 },
];

export const mockWeekSummary: WeekSummary = {
  week: {
    id: 1,
    weekStartDate: '2025-12-29',
    totalHours: 168, // 24 * 7
  },
  totalAllocated: 147,
  totalSpent: 121,
  remaining: 47,
  budgets: mockBudgets,
};

export const mockTransactions: Transaction[] = [
  { id: 1, date: '2025-12-29', category: 'Work', timeSpent: 8, description: 'Project development' },
  { id: 2, date: '2025-12-29', category: 'Sleep', timeSpent: 7, description: 'Night sleep' },
  { id: 3, date: '2025-12-29', category: 'Learning', timeSpent: 2, description: 'TypeScript course' },
  { id: 4, date: '2025-12-30', category: 'Work', timeSpent: 8, description: 'Code review' },
  { id: 5, date: '2025-12-30', category: 'Exercise', timeSpent: 1, description: 'Morning run' },
  { id: 6, date: '2025-12-30', category: 'Friends & Family', timeSpent: 3, description: 'Dinner with family' },
  { id: 7, date: '2025-12-30', category: 'Sleep', timeSpent: 7, description: 'Night sleep' },
  { id: 8, date: '2025-12-31', category: 'Work', timeSpent: 6, description: 'Sprint planning' },
  { id: 9, date: '2025-12-31', category: 'Personal', timeSpent: 4, description: 'Reading' },
  { id: 10, date: '2025-12-31', category: 'Learning', timeSpent: 2, description: 'React patterns' },
  { id: 11, date: '2025-12-31', category: 'Sleep', timeSpent: 7, description: 'Night sleep' },
  { id: 12, date: '2026-01-01', category: 'Friends & Family', timeSpent: 5, description: 'New Year celebration' },
  { id: 13, date: '2026-01-01', category: 'Personal', timeSpent: 3, description: 'Relaxation' },
  { id: 14, date: '2026-01-01', category: 'Sleep', timeSpent: 8, description: 'Night sleep' },
  { id: 15, date: '2026-01-01', category: 'Exercise', timeSpent: 1, description: 'Evening walk' },
];

/**
 * Get mock week summary
 */
export function getMockWeekSummary(weekStart: string): WeekSummary {
  return {
    ...mockWeekSummary,
    week: {
      ...mockWeekSummary.week,
      weekStartDate: weekStart,
    },
  };
}

/**
 * Get mock transactions for a week
 */
export function getMockTransactions(): Transaction[] {
  return mockTransactions;
}

