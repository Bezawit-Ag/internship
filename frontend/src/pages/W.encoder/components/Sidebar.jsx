import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col fixed h-full shrink-0">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">Woreda Encoder</h1>
      </div>
      <nav className="flex-1 p-4 font-medium space-y-2">
        <button 
          onClick={() => setActiveMenu('Beneficiary Registry')}
          className={`w-full text-left p-3 rounded transition-colors ${activeMenu === 'Beneficiary Registry' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
        >
          Beneficiary Registry
        </button>
        <button 
          onClick={() => setActiveMenu('Problem Registry')}
          className={`w-full text-left p-3 rounded transition-colors ${activeMenu === 'Problem Registry' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
        >
          Problem Registry
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
