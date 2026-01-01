"use client";

import { useState } from 'react';
import type { BudgetWithStats } from '@/app/types';

interface BudgetCategoryCardProps {
  budget: BudgetWithStats;
  onUpdate: (id: number, newAllocated: number) => Promise<void>;
}

export default function BudgetCategoryCard({ budget, onUpdate }: BudgetCategoryCardProps) {
  const [allocated, setAllocated] = useState(budget.allocated);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleBlur = async () => {
    if (allocated !== budget.allocated) {
      setIsSaving(true);
      try {
        await onUpdate(budget.id, allocated);
      } catch (error) {
        console.error('Failed to update budget:', error);
        setAllocated(budget.allocated); // Revert on error
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setAllocated(budget.allocated);
      setIsEditing(false);
    }
  };

  const remaining = budget.remaining;
  const isOverBudget = remaining < 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            isOverBudget ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {isOverBudget ? 'Over Budget' : 'On Track'}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Allocated</p>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={allocated}
              onChange={(e) => setAllocated(parseFloat(e.target.value) || 0)}
              onFocus={() => setIsEditing(true)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              min="0"
              step="0.5"
              disabled={isSaving}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
            <span className="text-sm text-gray-600">h</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Spent</p>
          <p className="text-lg font-semibold text-gray-800">{budget.spent}h</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Remaining</p>
          <p
            className={`text-lg font-semibold ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {remaining}h
          </p>
        </div>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            isOverBudget ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{
            width: `${Math.min((budget.spent / allocated) * 100, 100)}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-600">
        <span>{allocated > 0 ? ((budget.spent / allocated) * 100).toFixed(0) : 0}% used</span>
        {isOverBudget && <span className="text-red-600 font-medium">Over by {Math.abs(remaining)}h</span>}
      </div>

      {isSaving && (
        <p className="text-xs text-blue-600 mt-2">Saving...</p>
      )}
    </div>
  );
}

