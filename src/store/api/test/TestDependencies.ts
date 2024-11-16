import { TimeRecord } from "../../domain/time/TimeRecord";
import { Dependencies } from "../Dependencies";
import { fakeTimeRecords } from "./fakeTimeRecords";

export class TestDependencies implements Dependencies {
    getTimeRecords = async (): Promise<TimeRecord[]> => {
        return fakeTimeRecords;
    }
}

