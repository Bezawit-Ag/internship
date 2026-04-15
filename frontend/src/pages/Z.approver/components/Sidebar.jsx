import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, CheckSquare, AlertTriangle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0a1128] text-slate-300 flex flex-col min-h-screen font-sans border-r border-[#1a233a] shadow-xl shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <CheckSquare className="w-5 h-5 text-blue-400" />
          </span>
          Zone Approver
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 space-y-1">
          <NavLink to="/zoneA" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </NavLink>
        </nav>

        <div className="mt-8 px-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-4">Approval Tasks</h2>
          <nav className="space-y-1">
            <NavLink to="/zoneA/queue" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
              <CheckSquare className="w-5 h-5" /> Approval Queue
            </NavLink>
            <NavLink to="/zoneA/problems" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
              <AlertTriangle className="w-5 h-5" /> Problem Approval
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-[#1a233a]">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 hover:text-red-400 text-slate-400 transition-colors font-medium text-left">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
