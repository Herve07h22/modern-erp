import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import CompanyDetails from './pages/CompanyDetails';
import Projects from './pages/Projects';
import Quotations from './pages/Quotations';
import TimeTracking from './pages/TimeTracking';
import Invoices from './pages/Invoices';
import { AppState } from './store/domain/App';
import { TestDependencies } from './store/api/test/TestDependencies';


const app = new AppState(new TestDependencies());

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crm" element={<CRM />} />
          <Route path="crm/companies/:id" element={<CompanyDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="invoices" element={<Invoices />} />
          <Route loader={() => app.timeTrackingStore.initialize()} path="time-tracking" element={<TimeTracking timeTrackingStore={app.timeTrackingStore} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;