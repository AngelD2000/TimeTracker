// Core entity types matching your Spring Boot backend

export interface WeekEntity {
  id: number;
  weekStartDate: string; // ISO date format "2025-11-11"
  totalHours: number;
}

export interface CategoryBudget {
  id: number;
  weekId: number;
  category: string;
  allocated: number;
}

export interface Transaction {
  id: number;
  date: string; // ISO date format
  category: string;
  timeSpent: number;
  description: string;
}

// API Response types

export interface BudgetWithStats extends CategoryBudget {
  spent: number;
  remaining: number;
}

export interface WeekSummary {
  week: WeekEntity;
  totalAllocated: number;
  totalSpent: number;
  remaining: number;
  budgets: BudgetWithStats[];
}

export interface DashboardData {
  weekSummary: WeekSummary;
  transactions: Transaction[];
  categoryTotals: CategoryTotal[];
}

export interface CategoryTotal {
  category: string;
  hours: number;
  color: string;
}

// Form types

export interface CreateTransactionRequest {
  date: string;
  category: string;
  timeSpent: number;
  description: string;
}

export interface CreateBudgetRequest {
  category: string;
  allocated: number;
}

export interface UpdateBudgetRequest {
  allocated: number;
}

// UI State types

export type TimePeriod = 'day' | 'week' | 'month' | 'year';

export interface CategoryColors {
  [key: string]: string;
}

export const CATEGORY_COLORS: CategoryColors = {
  'Work': '#3b82f6',
  'Sleep': '#8b5cf6',
  'Learning': '#10b981',
  'Friends & Family': '#f59e0b',
  'Personal': '#ec4899',
  'Exercise': '#06b6d4',
};

