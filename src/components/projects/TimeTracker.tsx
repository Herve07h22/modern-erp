import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Plus, Trash2 } from 'lucide-react';
import type { TimeRecord } from '../../types/project';

interface TimeTrackerProps {
  records: TimeRecord[];
  onAddRecord: (record: Omit<TimeRecord, 'id' | 'createdAt'>) => void;
  onDeleteRecord: (recordId: string) => void;
}

export default function TimeTracker({ records, onAddRecord, onDeleteRecord }: TimeTrackerProps) {
  const [hours, setHours] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hours.trim()) return;

    onAddRecord({
      taskId: records[0]?.taskId, // Assuming all records belong to the same task
      date: new Date().toISOString(),
      hours: parseFloat(hours),
      comment,
      userId: 'current-user', // In real app, get from auth context
    });

    setHours('');
    setComment('');
  };

  const totalHours = records.reduce((sum, record) => sum + record.hours, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Time Tracking</h3>
        <div className="flex items-center text-gray-500">
          <Clock className="w-5 h-5 mr-2" />
          Total: {totalHours}h
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="number"
          step="0.25"
          min="0"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          className="w-24 px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="text-sm font-medium text-gray-900">
                {record.hours}h - {record.comment}
              </div>
              <div className="text-xs text-gray-500">
                {format(new Date(record.date), 'MMM d, yyyy')}
              </div>
            </div>
            <button
              onClick={() => onDeleteRecord(record.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}