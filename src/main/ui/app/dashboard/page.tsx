import { getWeekStart } from '../lib/dateHelpers';
import { getMockWeekSummary, getMockTransactions } from '../lib/mockData';
import DashboardClient from './DashboardClient';
import Header from '../components/shared/Header';
import type { Transaction } from '../types';

export default async function DashboardPage() {
  // Get current week
  const currentWeekStart = getWeekStart();

  // Use mock data for now (replace with API calls when backend is ready)
  const weekSummary = getMockWeekSummary(currentWeekStart);
  const transactions = getMockTransactions();

  // Process data for Sankey visualization
  const categoryData: {
    [category: string]: {
      total: number;
      projects: { [project: string]: number };
    };
  } = {};

  // Group transactions by category and description (project)
  transactions.forEach((transaction: Transaction) => {
    if (!categoryData[transaction.category]) {
      categoryData[transaction.category] = {
        total: 0,
        projects: {},
      };
    }

    categoryData[transaction.category].total += transaction.timeSpent;

    const project = transaction.description || 'Uncategorized';
    if (!categoryData[transaction.category].projects[project]) {
      categoryData[transaction.category].projects[project] = 0;
    }
    categoryData[transaction.category].projects[project] += transaction.timeSpent;
  });

  // Calculate stats
  const totalHours = weekSummary.totalSpent;
  const categoryCount = Object.keys(categoryData).length;
  const projectCount = Object.values(categoryData).reduce(
    (sum, cat) => sum + Object.keys(cat.projects).length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardClient
          totalHours={totalHours}
          categoryCount={categoryCount}
          projectCount={projectCount}
          categoryData={categoryData}
          transactions={transactions}
        />
      </main>
    </div>
  );
}
