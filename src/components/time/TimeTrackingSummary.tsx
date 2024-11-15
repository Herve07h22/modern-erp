import { Calendar } from 'lucide-react';

interface TimeTrackingSummaryProps {
  totalHours: number;
  workdayAverage: string;
}

export function TimeTrackingSummary({ totalHours, workdayAverage }: TimeTrackingSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Summary</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Total Hours</div>
          <div className="text-2xl font-bold text-gray-900">
            {totalHours}h
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Workday Average</div>
          <div className="text-2xl font-bold text-gray-900">
            {workdayAverage}h
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Excluding weekends
          </div>
        </div>
      </div>
    </div>
  );
} 