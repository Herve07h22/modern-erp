import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import KanbanBoard from '../components/projects/KanbanBoard';
import TaskEditor from '../components/projects/TaskEditor';
import TimeTracker from '../components/projects/TimeTracker';
import type { Project, Task, TaskStatus, TimeRecord } from '../types/project';

// Mock data
const mockProject: Project = {
  id: '1',
  name: 'Website Redesign',
  description: 'Complete overhaul of company website',
  company: {
    id: '1',
    name: 'Acme Corp',
    companyId: 'ACM001',
    industry: 'Technology',
    size: 'large',
    status: 'active',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94105'
    },
    contacts: [],
    createdAt: '',
    updatedAt: ''
  },
  startDate: '2024-03-01',
  status: 'active',
  tasks: [
    {
      id: '1',
      title: 'Design System',
      description: 'Create a comprehensive design system',
      status: 'in_progress',
      priority: 'high',
      assignee: 'John',
      dueDate: '2024-03-20',
      timeRecords: [
        {
          id: '1',
          taskId: '1',
          date: '2024-03-15',
          hours: 4,
          comment: 'Initial setup',
          userId: 'user1',
          createdAt: '2024-03-15'
        }
      ],
      content: '<p>Working on the design system components...</p>',
      projectId: '1',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-15'
    }
  ],
  createdAt: '2024-03-01',
  updatedAt: '2024-03-15'
};

export default function Projects() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company');
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [project] = useState<Project>(mockProject);

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    // In real app, update task status through API
    console.log('Moving task', taskId, 'to', newStatus);
  };

  const handleTaskContentChange = (content: string) => {
    if (!selectedTask) return;
    // In real app, update task content through API
    console.log('Updating task content', content);
  };

  const handleAddTimeRecord = (record: Omit<TimeRecord, 'id' | 'createdAt'>) => {
    // In real app, add time record through API
    console.log('Adding time record', record);
  };

  const handleDeleteTimeRecord = (recordId: string) => {
    // In real app, delete time record through API
    console.log('Deleting time record', recordId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500">
            {project.company.name} • Started {new Date(project.startDate).toLocaleDateString()}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="flex gap-4 ">
        <div className={`flex-1 overflow-x-auto ${selectedTask ? 'max-w-screen-md	' : ''}`}>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <KanbanBoard
            tasks={project.tasks}
            onTaskMove={handleTaskMove}
            onTaskClick={setSelectedTask}
          />
        </div>

        {selectedTask && (
          <div className="w-96 bg-white p-6 rounded-lg shadow-lg space-y-6 flex-1 transition">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {selectedTask.title}
              </h2>
              <p className="text-sm text-gray-500">
                Created {new Date(selectedTask.createdAt).toLocaleDateString()}
              </p>
            </div>

            <TaskEditor
              content={selectedTask.content}
              onChange={handleTaskContentChange}
            />

            <TimeTracker
              records={selectedTask.timeRecords}
              onAddRecord={handleAddTimeRecord}
              onDeleteRecord={handleDeleteTimeRecord}
            />
          </div>
        )}
      </div>
    </div>
  );
}