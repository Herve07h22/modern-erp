import { makeAutoObservable } from 'mobx';
import { TimeRecord } from '../types/project';
import { format } from 'date-fns';
import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isWeekend,
  isSameMonth
} from 'date-fns';
const fakeTimeRecords: TimeRecord[] = [
    { id: '1', taskId: '1', date: '2024-11-15', hours: 3, comment: 'Lorem ipsum dolor sit amet', userId: '1', createdAt: '2024-11-15T00:00:00.000Z' },
    { id: '2', taskId: '2', date: '2024-11-15', hours: 2, comment: 'Lorem ipsum dolor sit amet', userId: '1', createdAt: '2024-11-15T00:00:00.000Z' },
];

export class TimeTrackingStore {
  currentDate = new Date();
  viewMode: 'week' | 'month' = 'week';
  isLoading = true;
  timeRecords: TimeRecord[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    try {
      // Chargez vos données ici
      // Par exemple : this.timeRecords = await fetchTimeRecords();
      this.timeRecords = fakeTimeRecords;
      this.isLoading = false;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      this.isLoading = false;
    }
  }

  setCurrentDate(date: Date) {
    this.currentDate = date;
  }

  setViewMode(mode: 'week' | 'month') {
    this.viewMode = mode;
  }

  getRecordsForDay(date: Date) {
    if (!this.timeRecords) return [];
    return this.timeRecords.filter(record => 
      format(new Date(record.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  }

  getDailyTotal(date: Date) {
    return this.getRecordsForDay(date).reduce((total, record) => total + record.hours, 0);
  }

  getDaysInRange() {
    if (this.viewMode === 'week') {
      return eachDayOfInterval({
        start: startOfWeek(this.currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(this.currentDate, { weekStartsOn: 1 })
      });
    } else {
      const monthStart = startOfMonth(this.currentDate);
      const monthEnd = endOfMonth(this.currentDate);
      const firstMonday = startOfWeek(monthStart, { weekStartsOn: 1 });
      
      return eachDayOfInterval({
        start: firstMonday,
        end: endOfWeek(monthEnd, { weekStartsOn: 1 })
      });
    }
  }

  navigatePrevious() {
    if (this.viewMode === 'week') {
      this.currentDate = subWeeks(this.currentDate, 1);
    } else {
      this.currentDate = subMonths(this.currentDate, 1);
    }
  }

  navigateNext() {
    if (this.viewMode === 'week') {
      this.currentDate = addWeeks(this.currentDate, 1);
    } else {
      this.currentDate = addMonths(this.currentDate, 1);
    }
  }

  get days() {
    return this.getDaysInRange();
  }

  get workdays() {
    return this.days.filter(day => !isWeekend(day) && isSameMonth(day, this.currentDate));
  }

  get totalHours() {
    return this.days
      .filter(day => isSameMonth(day, this.currentDate))
      .reduce((total, day) => total + this.getDailyTotal(day), 0);
  }

  get workdayAverage() {
    return this.workdays.length > 0 
      ? (this.workdays.reduce((total, day) => total + this.getDailyTotal(day), 0) / this.workdays.length).toFixed(1)
      : '0.0';
  }
}

export const timeTrackingStore = new TimeTrackingStore(); 