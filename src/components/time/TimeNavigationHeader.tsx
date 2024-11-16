import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeNavigationHeaderProps {
  viewMode: 'week' | 'month';
  setViewMode: (mode: 'week' | 'month') => void;
  currentDate: Date;
  days: Date[];
  navigatePrevious: () => void;
  navigateNext: () => void;
}

export function TimeNavigationHeader({
  viewMode,
  setViewMode,
  currentDate,
  days,
  navigatePrevious,
  navigateNext,
}: TimeNavigationHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 rounded-lg ${
              viewMode === 'week'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded-lg ${
              viewMode === 'month'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Month
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={navigatePrevious}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {viewMode === 'week'
              ? `Week of ${format(days[0], 'MMM d, yyyy')}`
              : format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={navigateNext}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 