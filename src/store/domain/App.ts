import { makeAutoObservable } from "mobx";
import { TimeTrackingStore } from "./time/timeTrackingStore";
import { Dependencies } from "../api/Dependencies";

export class AppState {
    timeTrackingStore: TimeTrackingStore;
    logger = {
        info: console.log,
        error: console.error
    }

    constructor(private dependencies: Dependencies) {
        makeAutoObservable(this);
        this.timeTrackingStore = new TimeTrackingStore(this.dependencies, this);
    }
}