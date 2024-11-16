import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import type { Task, TaskStatus } from '../../store/domain/projects/project';
import { format } from 'date-fns';
import { Clock, AlertCircle } from 'lucide-react';

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

interface Props {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
}

export default function KanbanBoard({ tasks, onTaskMove, onTaskClick }: Props) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as TaskStatus;
    onTaskMove(draggableId, newStatus);
  };

  const getTotalHours = (task: Task) => {
    return task.timeRecords.reduce((total, record) => total + record.hours, 0);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">{column.title}</h3>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-gray-100' : ''
                    }`}
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => onTaskClick(task)}
                          className={`
                            bg-white p-4 rounded-lg shadow-sm
                            ${snapshot.isDragging ? 'shadow-lg' : ''}
                            hover:shadow-md transition-shadow cursor-pointer
                          `}
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
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high'
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
        ))}
      </div>
    </DragDropContext>
  );
}