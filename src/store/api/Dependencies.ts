import { TimeRecord } from "../domain/time/TimeRecord";

export interface Dependencies {
    getTimeRecords: () => Promise<TimeRecord[]>;
}

