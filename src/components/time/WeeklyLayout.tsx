import { format, isWeekend } from 'date-fns';
import React from 'react';
import { TimeTrackingStore } from '../../store/domain/time/timeTrackingStore';

interface WeeklyLayoutProps {
    timeTrackingStore: TimeTrackingStore;
}

export const WeeklyLayout = ({ timeTrackingStore }: WeeklyLayoutProps) => {
  // Grouper les enregistrements par tâche/projet
  const groupedRecords = timeTrackingStore.timeRecords.reduce((acc, record) => {
    const key = record.taskId
    if (!acc[key]) {
      acc[key] = {
        taskName: record.taskName,
        projectName: record.projectName,
        records: {}
      };
    }
    const dateKey = format(record.date, 'yyyy-MM-dd');
    acc[key].records[dateKey] = (acc[key].records[dateKey] || 0) + record.hours;
    return acc;
  }, {} as Record<string, { taskName: string; projectName: string; records: Record<string, number> }>);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-8 gap-px bg-gray-200">
        {/* En-tête */}
        <div className="bg-white p-4 font-medium text-gray-900">
          Task
        </div>
        {timeTrackingStore.days.map((day) => (
          <div key={day.toISOString()} className={`p-4 font-medium text-center ${
            isWeekend(day) ? 'bg-gray-100 text-gray-600' : 'bg-white text-gray-900'
          }`}>
            {format(day, 'EEE d')}
          </div>
        ))}

        {/* Lignes des tâches */}
        {Object.entries(groupedRecords).map(([key, { taskName, projectName, records }]) => (
          <React.Fragment key={key}>
            <div className="bg-white p-4">
              <div className="font-medium text-gray-900">{taskName}</div>
              <div className="text-sm text-gray-500">{projectName}</div>
            </div>
            {timeTrackingStore.days.map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const hours = records[dateKey] || 0;
              return (
                <div key={dateKey} className="bg-white p-4 text-center">
                  {hours > 0 ? `${hours}h` : '-'}
                </div>
              );
            })}
          </React.Fragment>
        ))}
        {/* Lignes calculant la somme des tempas de chaque jour */}
        <div className="bg-white p-4 font-medium text-gray-900">
          Total
        </div>
        {timeTrackingStore.days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dailyTotal = Object.values(groupedRecords).reduce((total, { records }) => {
            return total + (records[dateKey] || 0);
          }, 0);
          return (
            <div key={dateKey} className="bg-white p-4 font-medium text-gray-900 text-center">
              {dailyTotal > 0 ? `${dailyTotal}h` : '-'}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 