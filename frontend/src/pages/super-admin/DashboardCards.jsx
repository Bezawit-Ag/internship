import { Shield, Users, Box, MapPin, Clock, AlertTriangle } from "lucide-react";

export default function DashboardCards({ stats }) {
  if (!stats) return null;

  const cardData = [
    { label: "Total Suppliers", value: stats.total_suppliers, trend: stats.suppliers_trend, icon: Shield, color: "blue" },
    { label: "Total Beneficiaries", value: stats.total_beneficiaries, trend: stats.beneficiaries_trend, icon: Users, color: "cyan" },
    { label: "Units Distributed", value: stats.units_distributed, trend: stats.units_trend, icon: Box, color: "indigo" },
    { label: "Active Zones", value: stats.active_zones, trend: 0, icon: MapPin, color: "purple" },
    { label: "Pending Approvals", value: stats.pending_approvals, trend: stats.pending_trend, icon: Clock, color: "orange" },
    { label: "Equipment Issues", value: stats.equipment_issues, trend: stats.issues_trend, icon: AlertTriangle, color: "red" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mb-8">
      {cardData.map((stat, i) => {
        const isPositive = stat.trend > 0;
        const isNegative = stat.trend < 0;
        
        return (
          <div key={i} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
               <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-${stat.color}-500 bg-${stat.color}-50`}>
                  <stat.icon className="w-5 h-5" />
               </div>
               {stat.trend !== 0 && (
                 <span className={`text-[11px] font-bold flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                   {isPositive ? "↗" : "↘"} {Math.abs(stat.trend)}%
                 </span>
               )}
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value.toLocaleString()}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        )
      })}
    </div>
  );
}
