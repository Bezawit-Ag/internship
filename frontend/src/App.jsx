import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCards from './components/DashboardCards';
import { DistributionTrendChart, EquipmentTypeChart, BeneficiariesBarChart, SupplierPerformanceChart } from './components/Charts';
import ActivityLog from './components/ActivityLog';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {loading ? (
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

               <ActivityLog activities={data.recent_activity} />
             </div>
          ) : (
             <div className="flex h-full items-center justify-center font-bold text-red-400">Failed to load data.</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;