"use client";

import { CATEGORY_COLORS } from '@/app/types';

interface SankeyFlowProps {
  categoryData: {
    [category: string]: {
      total: number;
      projects: { [project: string]: number };
    };
  };
  totalHours: number;
}

export default function SankeyFlow({ categoryData, totalHours }: SankeyFlowProps) {
  return (
    <div className="space-y-8">
      {/* Total Time Source */}
      <div className="flex items-center justify-center">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-sm font-semibold opacity-90">Total Time</div>
            <div className="text-3xl font-bold">{totalHours}h</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categoryData).map(([category, data]) => (
          <div key={category} className="space-y-4">
            {/* Category Node */}
            <div
              className="rounded-lg p-4 shadow-lg text-white"
              style={{ backgroundColor: CATEGORY_COLORS[category] || '#94a3b8' }}
            >
              <div className="text-center">
                <div className="text-sm font-semibold opacity-90">{category}</div>
                <div className="text-2xl font-bold">{data.total}h</div>
                <div className="text-xs opacity-75 mt-1">
                  {((data.total / totalHours) * 100).toFixed(0)}% of total
                </div>
              </div>
            </div>

            {/* Flow Indicator */}
            <div className="flex justify-center">
              <svg width="40" height="40">
                <path
                  d="M 20 5 L 20 35 M 15 30 L 20 35 L 25 30"
                  stroke={CATEGORY_COLORS[category] || '#94a3b8'}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Projects */}
            <div className="space-y-2">
              {Object.entries(data.projects).map(([project, hours]) => {
                const percentage = (hours / data.total) * 100;
                return (
                  <div
                    key={project}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800 text-sm">{project}</span>
                      <span
                        className="font-bold"
                        style={{ color: CATEGORY_COLORS[category] || '#94a3b8' }}
                      >
                        {hours}h
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: CATEGORY_COLORS[category] || '#94a3b8',
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {percentage.toFixed(0)}% of {category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

