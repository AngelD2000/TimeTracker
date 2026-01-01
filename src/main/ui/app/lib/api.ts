/**
 * API client for calling Next.js API routes
 * Currently using mock responses for development
 */

import type {
  WeekSummary,
  Transaction,
  CreateTransactionRequest,
  CreateBudgetRequest,
  UpdateBudgetRequest,
  CategoryBudget,
} from '@/app/types';

// Set to true to use mock data, false to use real API
const USE_MOCK = true;

const API_BASE = '/api';

/**
 * Handles API errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API error: ${response.status}`);
  }
  return response.json();
}

// Mock data for client-side operations
let mockTransactionId = 100;

/**
 * Week API
 */
export const weekAPI = {
  /**
   * Get week summary with budgets and stats
   */
  getSummary: async (weekStart: string): Promise<WeekSummary> => {
    if (USE_MOCK) {
      // This is handled server-side with mock data
      throw new Error('Use server-side mock data instead');
    }
    const response = await fetch(`${API_BASE}/weeks/${weekStart}/summary`, {
      cache: 'no-store',
    });
    return handleResponse<WeekSummary>(response);
  },

  /**
   * Create a new week
   */
  createWeek: async (weekStart: string): Promise<void> => {
    if (USE_MOCK) {
      console.log('[Mock] Creating week:', weekStart);
      return;
    }
    const response = await fetch(`${API_BASE}/weeks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weekStart }),
    });
    return handleResponse(response);
  },

  /**
   * Copy budgets from previous week
   */
  copyFromLastWeek: async (weekStart: string): Promise<void> => {
    if (USE_MOCK) {
      console.log('[Mock] Copying from last week for:', weekStart);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }
    const response = await fetch(`${API_BASE}/weeks/${weekStart}/copy-from-last`, {
      method: 'POST',
    });
    return handleResponse(response);
  },
};

/**
 * Budget API
 */
export const budgetAPI = {
  /**
   * Get all budgets for a week
   */
  getByWeek: async (weekStart: string): Promise<CategoryBudget[]> => {
    if (USE_MOCK) {
      throw new Error('Use server-side mock data instead');
    }
    const response = await fetch(`${API_BASE}/budgets?weekStart=${weekStart}`, {
      cache: 'no-store',
    });
    return handleResponse<CategoryBudget[]>(response);
  },

  /**
   * Create or update a budget
   */
  createOrUpdate: async (
    weekStart: string,
    data: CreateBudgetRequest
  ): Promise<CategoryBudget> => {
    if (USE_MOCK) {
      console.log('[Mock] Creating/updating budget:', data);
      return {
        id: Math.floor(Math.random() * 1000),
        weekId: 1,
        category: data.category,
        allocated: data.allocated,
      };
    }
    const response = await fetch(`${API_BASE}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, weekStart }),
    });
    return handleResponse<CategoryBudget>(response);
  },

  /**
   * Update a budget
   */
  update: async (id: number, data: UpdateBudgetRequest): Promise<CategoryBudget> => {
    if (USE_MOCK) {
      console.log('[Mock] Updating budget:', id, data);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        id,
        weekId: 1,
        category: 'Updated',
        allocated: data.allocated,
      };
    }
    const response = await fetch(`${API_BASE}/budgets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<CategoryBudget>(response);
  },

  /**
   * Delete a budget
   */
  delete: async (id: number): Promise<void> => {
    if (USE_MOCK) {
      console.log('[Mock] Deleting budget:', id);
      return;
    }
    const response = await fetch(`${API_BASE}/budgets/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

/**
 * Transaction API
 */
export const transactionAPI = {
  /**
   * Get all transactions for a week
   */
  getByWeek: async (weekStart: string): Promise<Transaction[]> => {
    if (USE_MOCK) {
      throw new Error('Use server-side mock data instead');
    }
    const response = await fetch(`${API_BASE}/transactions?weekStart=${weekStart}`, {
      cache: 'no-store',
    });
    return handleResponse<Transaction[]>(response);
  },

  /**
   * Get all transactions for a category in a week
   */
  getByCategory: async (category: string, weekStart: string): Promise<Transaction[]> => {
    if (USE_MOCK) {
      throw new Error('Use server-side mock data instead');
    }
    const response = await fetch(
      `${API_BASE}/transactions?category=${category}&weekStart=${weekStart}`,
      { cache: 'no-store' }
    );
    return handleResponse<Transaction[]>(response);
  },

  /**
   * Create a new transaction
   */
  create: async (data: CreateTransactionRequest): Promise<Transaction> => {
    if (USE_MOCK) {
      console.log('[Mock] Creating transaction:', data);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        id: ++mockTransactionId,
        ...data,
      };
    }
    const response = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Transaction>(response);
  },

  /**
   * Update a transaction
   */
  update: async (id: number, data: CreateTransactionRequest): Promise<Transaction> => {
    if (USE_MOCK) {
      console.log('[Mock] Updating transaction:', id, data);
      return { id, ...data };
    }
    const response = await fetch(`${API_BASE}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Transaction>(response);
  },

  /**
   * Delete a transaction
   */
  delete: async (id: number): Promise<void> => {
    if (USE_MOCK) {
      console.log('[Mock] Deleting transaction:', id);
      return;
    }
    const response = await fetch(`${API_BASE}/transactions/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
