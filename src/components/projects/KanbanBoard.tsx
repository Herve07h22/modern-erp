import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Clock, AlertCircle } from 'lucide-react';
import type { Task, TaskStatus } from '../../types/project';
import { format } from 'date-fns';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
}

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export default function KanbanBoard({ tasks, onTaskMove, onTaskClick }: KanbanBoardProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    onTaskMove(draggableId, destination.droppableId as TaskStatus);
  };

  const getColumnTasks = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getTotalHours = (task: Task) => {
    return task.timeRecords.reduce((total, record) => total + record.hours, 0);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                {column.title} ({getColumnTasks(column.id).length})
              </h3>
              
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {getColumnTasks(column.id).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onTaskClick(task)}
                            className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
                          >
                            <h4 className="font-medium text-gray-900 mb-2">
                              {task.title}
                            </h4>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {getTotalHours(task)}h
                              </div>
                              {task.dueDate && new Date(task.dueDate) < new Date() && (
                                <div className="flex items-center text-red-500">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  Overdue
                                </div>
                              )}
                            </div>

                            {task.dueDate && (
                              <div className="text-xs text-gray-500">
                                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </div>
                            )}

                            <div className="mt-2 flex items-center justify-between">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-800'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {task.priority}
                              </span>
                              {task.assignee && (
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                  {task.assignee.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}