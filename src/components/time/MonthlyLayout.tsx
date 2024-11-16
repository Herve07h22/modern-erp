import { observer } from "mobx-react-lite";
import { DayCell } from "./DayCell";
import { TimeTrackingStore } from "../../store/domain/time/timeTrackingStore";

interface MonthlyLayoutProps {
    timeTrackingStore: TimeTrackingStore;
}

export const MonthlyLayout = observer(({ timeTrackingStore }: MonthlyLayoutProps) => {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-7 gap-px bg-gray-200">
                {timeTrackingStore.days.map((day) => (
                    <DayCell
                        key={day.toISOString()}
                        day={day}
                        currentDate={timeTrackingStore.currentDate}
                        records={timeTrackingStore.getRecordsForDay(day) || []}
                        dailyTotal={timeTrackingStore.getDailyTotal(day)}
                    />
                ))}
            </div>
        </div>
    );
}); 