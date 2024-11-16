import { TimeRecord } from "../../domain/time/TimeRecord";

export const fakeTimeRecords: TimeRecord[] = [
    { 
        id: '1',
        taskId: '1', 
        date: '2024-11-15',
        hours: 3,
        comment: 'Lorem ipsum dolor sit amet',
        userId: '1',
        createdAt: '2024-11-15T00:00:00.000Z',
        taskName: 'Task 1',
        projectName: 'Project 1'
    },
    {
        id: '2',
        taskId: '2',
        date: '2024-11-15', 
        hours: 2,
        comment: 'Lorem ipsum dolor sit amet',
        userId: '1',
        createdAt: '2024-11-15T00:00:00.000Z',
        taskName: 'Task 2', 
        projectName: 'Project 2'
    },
];

