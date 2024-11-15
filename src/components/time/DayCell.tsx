import { format, isWeekend, isSameMonth } from 'date-fns';
import type { TimeRecord } from '../../types/project';

interface DayCellProps {
  day: Date;
  currentDate: Date;
  records: TimeRecord[];
  dailyTotal:  number;
}

export const DayCell = ({ day, currentDate, records, dailyTotal }: DayCellProps) => {
  const isWeekendDay = isWeekend(day);
  const isOutsideMonth = !isSameMonth(day, currentDate);

  return (
    <div 
      className={`${
        isWeekendDay 
          ? 'bg-gray-50' 
          : isOutsideMonth 
          ? 'bg-gray-50' 
          : 'bg-white'
      }`}
    >
      <div className={`p-2 border-b ${
        isWeekendDay || isOutsideMonth ? 'bg-gray-100' : ''
      }`}>
        <div className={`text-sm font-medium ${
          isOutsideMonth 
            ? 'text-gray-400'
            : isWeekendDay 
            ? 'text-gray-600' 
            : 'text-gray-900'
        }`}>
          {format(day, 'EEE')}
        </div>
        <div className={`text-sm ${
          isOutsideMonth ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {format(day, 'MMM d')}
        </div>
      </div>
      <div className="p-2 space-y-1 min-h-[200px] flex flex-col">
        <div className="flex-grow space-y-1">
          {!isOutsideMonth && records.map(record => (
            <div
              key={record.id}
              className="text-sm p-2 rounded bg-blue-50 border border-blue-100"
            >
              <div className="font-medium text-blue-900">
                {record.hours}h
              </div>
              <div className="text-blue-700 truncate">
                {record.comment}
              </div>
            </div>
          ))}
        </div>
        {!isOutsideMonth && (
          <div className="mt-auto pt-2 border-t">
            <div className="text-sm font-medium text-gray-900 flex items-center justify-between">
              <span>Total</span>
              <span>{dailyTotal}h</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 