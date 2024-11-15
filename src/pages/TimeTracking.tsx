import { observer } from 'mobx-react-lite';
import { timeTrackingStore } from '../store/timeTrackingStore';
import { TimeTrackingSummary } from '../components/time/TimeTrackingSummary';
import { TimeNavigationHeader } from '../components/time/TimeNavigationHeader';
import { DayCell } from '../components/time/DayCell';

const TimeTracking = observer(() => {

    if (timeTrackingStore.isLoading) {
        return <div className="container mx-auto px-4 py-8">Chargement...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TimeNavigationHeader
                viewMode={timeTrackingStore.viewMode}
                setViewMode={(v) => timeTrackingStore.setViewMode(v)}
                currentDate={timeTrackingStore.currentDate}
                days={timeTrackingStore.days}
                navigatePrevious={() => timeTrackingStore.navigatePrevious()}
                navigateNext={() => timeTrackingStore.navigateNext()}
            />

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

            <TimeTrackingSummary
                totalHours={timeTrackingStore.totalHours}
                workdayAverage={timeTrackingStore.workdayAverage}
            />
        </div>
    );
});

export default TimeTracking;