"use client";

import { useState } from 'react';
import { Clock, TrendingUp, Target, Plus } from 'lucide-react';
import StatsCard from './components/StatsCard';
import SankeyFlow from './components/SankeyFlow';
import RecentEntries from './components/RecentEntries';
import TimeEntryModal from '../components/TimeEntry/TimeEntryModal';
import type { Transaction } from '../types';
import { useRouter } from 'next/navigation';

interface DashboardClientProps {
  totalHours: number;
  categoryCount: number;
  projectCount: number;
  categoryData: {
    [category: string]: {
      total: number;
      projects: { [project: string]: number };
    };
  };
  transactions: Transaction[];
}

export default function DashboardClient({
  totalHours,
  categoryCount,
  projectCount,
  categoryData,
  transactions,
}: DashboardClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const router = useRouter();

  const handleEntrySuccess = () => {
    // Refresh the page to get new data from server
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Time Dashboard</h2>
          <p className="text-gray-600 mt-1">Track where your time goes</p>
        </div>
        <div className="flex gap-2">
          {(['day', 'week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timePeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Hours"
          value={`${totalHours}h`}
          icon={Clock}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Categories"
          value={categoryCount}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Projects"
          value={projectCount}
          icon={Target}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
      </div>

      {/* Sankey Flow */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 shadow-sm border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Flow Visualization</h3>
        <p className="text-sm text-gray-600 mb-6">
          Follow the flow: Total Time → Categories → Individual Projects
        </p>
        <SankeyFlow categoryData={categoryData} totalHours={totalHours} />
      </div>

      {/* Recent Entries */}
      <RecentEntries transactions={transactions} />

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
      />
    </div>
  );
}

