interface OverallProgressBarProps {
  totalAllocated: number;
  totalHours: number;
}

export default function OverallProgressBar({
  totalAllocated,
  totalHours,
}: OverallProgressBarProps) {
  const remaining = totalHours - totalAllocated;
  const percentage = (totalAllocated / totalHours) * 100;
  const isOverAllocated = totalAllocated > totalHours;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Total Allocation</h3>
        <div className="text-sm text-gray-600">
          {totalAllocated}h / {totalHours}h
        </div>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
        <div
          className="h-6 rounded-full transition-all duration-500 bg-purple-600"
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className={isOverAllocated ? 'text-red-600 font-semibold' : 'text-gray-600'}>
          {isOverAllocated ? (
            <>⚠️ Over by {Math.abs(remaining)}h</>
          ) : (
            <>Remaining: {remaining}h</>
          )}
        </span>
        <span className="text-gray-500">{percentage.toFixed(0)}% allocated</span>
      </div>

      {isOverAllocated && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            ⚠️ Cannot save: You've allocated {totalAllocated}h but only have {totalHours}h
            available.
          </p>
        </div>
      )}
    </div>
  );
}

