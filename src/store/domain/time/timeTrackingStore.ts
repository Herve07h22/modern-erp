import { makeAutoObservable } from 'mobx';
import { TimeRecord } from './TimeRecord';
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
import { AppState } from '../App';
import { Dependencies } from '../../api/Dependencies';

export class TimeTrackingStore {
  currentDate = new Date();
  viewMode: 'week' | 'month' = 'week';
  isLoading = true;
  timeRecords: TimeRecord[] = [];

  constructor(private dependencies: Dependencies, private app:AppState) {
    makeAutoObservable(this);
    this.initialize();
    this.app.logger.info('TimeTrackingStore initialized');
  }

  async initialize() {
    try {
     
      this.timeRecords = await this.dependencies.getTimeRecords();
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

