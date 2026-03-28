import React from 'react';

const Header = ({ activeMenu }) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{activeMenu}</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-600">encoder@woreda.local</span>
      </div>
    </header>
  );
};

export default Header;
