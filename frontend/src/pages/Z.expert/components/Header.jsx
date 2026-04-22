import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = ({ activeMenu, selectedZone }) => {
  return (
    <header className="bg-white border-b border-slate-100 h-20 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="text-blue-500 font-medium">Main Console</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">{activeMenu}</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-emerald-700">{selectedZone}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
           <div className="text-right">
             <p className="text-sm font-bold text-slate-800">Mulugeta Bekele</p>
             <p className="text-xs font-semibold text-blue-500">ZONE EXPERT</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold">
             MB
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
