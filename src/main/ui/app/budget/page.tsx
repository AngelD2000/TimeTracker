import { getWeekStart } from '../lib/dateHelpers';
import { getMockWeekSummary } from '../lib/mockData';
import BudgetingClient from './BudgetingClient';
import Header from '../components/shared/Header';

interface BudgetPageProps {
  searchParams: { week?: string };
}

export default async function BudgetPage({ searchParams }: BudgetPageProps) {
  // Get week from query param or use current week
  const weekStart = searchParams.week || getWeekStart();

  // Use mock data for now (replace with API calls when backend is ready)
  const weekSummary = getMockWeekSummary(weekStart);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BudgetingClient
          weekStart={weekStart}
          totalHours={weekSummary.week.totalHours}
          totalAllocated={weekSummary.totalAllocated}
          budgets={weekSummary.budgets}
        />
      </main>
    </div>
  );
}
