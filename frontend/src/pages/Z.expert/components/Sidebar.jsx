import React from 'react';
import { Users, FileText, LayoutDashboard, LogOut } from 'lucide-react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <aside className="w-64 bg-white text-slate-600 flex flex-col min-h-screen font-sans border-r border-slate-200 shadow-sm shrink-0">
      <div className="p-6 border-b border-slate-100 mb-4">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-500" />
          </span>
          Zone Expert
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 space-y-2">
          <button 
            onClick={() => setActiveMenu('Dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeMenu === 'Dashboard' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveMenu('Agent Management')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeMenu === 'Agent Management' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
          >
            <Users className="w-5 h-5" /> Agent Management
          </button>
          
          <button 
            onClick={() => setActiveMenu('Zone Beneficiaries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeMenu === 'Zone Beneficiaries' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
          >
             <FileText className="w-5 h-5" /> Zone Beneficiaries
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-50 hover:text-red-500 text-slate-500 transition-colors font-medium text-left">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
