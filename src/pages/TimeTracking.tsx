import { observer } from 'mobx-react-lite';
import { TimeTrackingSummary } from '../components/time/TimeTrackingSummary';
import { TimeNavigationHeader } from '../components/time/TimeNavigationHeader';
import { MonthlyLayout } from '../components/time/MonthlyLayout';
import { WeeklyLayout } from '../components/time/WeeklyLayout';
import { TimeTrackingStore } from '../store/domain/time/timeTrackingStore';

const TimeTracking = observer( ({timeTrackingStore}: {timeTrackingStore: TimeTrackingStore}) => {
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

            {timeTrackingStore.viewMode === 'week' ? (
                <WeeklyLayout timeTrackingStore={timeTrackingStore} />
            ) : (
                <MonthlyLayout timeTrackingStore={timeTrackingStore} />
            )}

            <TimeTrackingSummary
                totalHours={timeTrackingStore.totalHours}
                workdayAverage={timeTrackingStore.workdayAverage}
            />
        </div>
    );
});

export default TimeTracking;