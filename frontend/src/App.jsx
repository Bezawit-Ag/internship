import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/super-admin/Dashboard/components/Sidebar';
import Header from './pages/super-admin/Dashboard/components/Header';
import DashboardCards from './pages/super-admin/Dashboard/DashboardCards';
import { DistributionTrendChart, EquipmentTypeChart, BeneficiariesBarChart, SupplierPerformanceChart } from './pages/super-admin/Dashboard/Charts';
import ActivityLog from './pages/super-admin/Dashboard/ActivityLog';
import AreaAssignment from './pages/super-admin/Area assignment/AreaAssignment';
import WoredaEncoderDashboard from './pages/W.encoder/Dashboard';
import WoredaApproverDashboard from './pages/W.approver/Dashboard';

function SuperAdminApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          {activeMenu === "Area Assignment" ? (
            <AreaAssignment />
          ) : activeMenu === "Dashboard" ? (
            loading ? (
              <div className="flex h-full items-center justify-center font-bold text-slate-400">Loading Dashboard...</div>
            ) : data ? (
              <div className="max-w-7xl mx-auto">
                <DashboardCards stats={data.stats} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                  <div className="xl:col-span-2">
                    <DistributionTrendChart data={data.distribution_trend} />
                  </div>
                  <div>
                    <EquipmentTypeChart data={data.equipment_type} />
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                  <BeneficiariesBarChart data={data.beneficiaries_by_zone} />
                  <SupplierPerformanceChart data={data.supplier_performance} />
                </div>

                {/* <ActivityLog activities={data.recent_activity} /> */}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center font-bold text-red-400">Failed to load data.</div>
            )
          ) : (
            <div className="flex h-full items-center justify-center flex-col text-slate-400">
              <h2 className="text-2xl font-bold mb-2">Page Under Construction</h2>
              <p>The {activeMenu} page is not yet implemented.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wencoder/*" element={<WoredaEncoderDashboard />} />
        <Route path="/wapprover/*" element={<WoredaApproverDashboard />} />
        {/* Default route for now maps to Super Admin Dashboard until authentication is ready */}
        <Route path="/*" element={<SuperAdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;