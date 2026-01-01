import { CATEGORY_COLORS, type Transaction } from '@/app/types';

interface RecentEntriesProps {
  transactions: Transaction[];
  limit?: number;
}

export default function RecentEntries({ transactions, limit = 8 }: RecentEntriesProps) {
  const recentEntries = transactions.slice(0, limit);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h3>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {recentEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No entries yet</p>
        ) : (
          recentEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[entry.category] || '#94a3b8' }}
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {entry.description || entry.category}
                  </p>
                  <p className="text-sm text-gray-600">{entry.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{entry.timeSpent}h</p>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

