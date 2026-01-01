"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import OverallProgressBar from './components/OverallProgressBar';
import BudgetCategoryCard from './components/BudgetCategoryCard';
import TimeEntryModal from '../components/TimeEntry/TimeEntryModal';
import { budgetAPI, weekAPI } from '../lib/api';
import { formatWeekRange, getPreviousWeek, getNextWeek } from '../lib/dateHelpers';
import type { BudgetWithStats } from '../types';

interface BudgetingClientProps {
  weekStart: string;
  totalHours: number;
  totalAllocated: number;
  budgets: BudgetWithStats[];
}

export default function BudgetingClient({
  weekStart,
  totalHours,
  totalAllocated,
  budgets: initialBudgets,
}: BudgetingClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isCopying, setIsCopying] = useState(false);
  const router = useRouter();

  const currentTotal = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const canSave = currentTotal <= totalHours;

  const handleUpdateBudget = async (id: number, newAllocated: number) => {
    // Optimistic update
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, allocated: newAllocated, remaining: newAllocated - b.spent } : b))
    );

    try {
      await budgetAPI.update(id, { allocated: newAllocated });
      router.refresh(); // Refresh server data
    } catch (error) {
      console.error('Failed to update budget:', error);
      // Revert on error
      setBudgets(initialBudgets);
    }
  };

  const handleCopyFromLastWeek = async () => {
    setIsCopying(true);
    try {
      await weekAPI.copyFromLastWeek(weekStart);
      router.refresh(); // Refresh to show copied data
    } catch (error) {
      console.error('Failed to copy from last week:', error);
      alert('Failed to copy from last week');
    } finally {
      setIsCopying(false);
    }
  };

  const handleEntrySuccess = () => {
    router.refresh();
  };

  const handleWeekNavigation = (newWeekStart: string) => {
    router.push(`/budget?week=${newWeekStart}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Week Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Time Budgeting</h2>
          <p className="text-gray-600 mt-1">Plan and allocate your time effectively</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleWeekNavigation(getPreviousWeek(weekStart))}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            ← Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Week of {formatWeekRange(weekStart)}
          </span>
          <button
            onClick={() => handleWeekNavigation(getNextWeek(weekStart))}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Overall Progress */}
      <OverallProgressBar totalAllocated={currentTotal} totalHours={totalHours} />

      {/* Copy from Last Week Button */}
      <button
        onClick={handleCopyFromLastWeek}
        disabled={isCopying}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {isCopying ? 'Copying...' : 'Copy from Last Week'}
      </button>

      {/* Budget Categories */}
      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500">No budgets set for this week</p>
            <button
              onClick={handleCopyFromLastWeek}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Copy from Last Week
            </button>
          </div>
        ) : (
          budgets.map((budget) => (
            <BudgetCategoryCard
              key={budget.id}
              budget={budget}
              onUpdate={handleUpdateBudget}
            />
          ))
        )}
      </div>

      {/* Budget Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Budget Tips</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Set realistic weekly goals based on your available hours</li>
          <li>• Review and adjust budgets monthly to match your priorities</li>
          <li>• Include buffer time for unexpected tasks</li>
          <li>• Balance work with personal development and rest</li>
        </ul>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Entry Modal */}
      <TimeEntryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleEntrySuccess}
        categories={budgets.map((b) => b.category)}
      />
    </div>
  );
}

