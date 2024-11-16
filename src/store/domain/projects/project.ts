import { Company } from '../crm/crm';
import { TimeRecord } from '../time/TimeRecord';

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';

export interface Project {
  id: string;
  name: string;
  description: string;
  company: Company;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'on_hold';
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  timeRecords: TimeRecord[];
  content: string; // Rich text content
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

