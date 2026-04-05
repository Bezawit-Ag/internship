import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegisterBeneficiary from './Register Beneficiary';
import RegisterProblem from './Register Problem';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Notifications');

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header activeMenu={activeMenu} />

        <main className="flex-1 p-8 overflow-y-auto">
          {activeMenu === 'Notifications' && <div className="text-slate-500">Notifications content goes here</div>}
          {activeMenu === 'Beneficiary Registration' && <RegisterBeneficiary />}
          {activeMenu === 'Problem Register' && <RegisterProblem />}
          {activeMenu === 'Change Status' && <div className="text-slate-500">Change Status content goes here</div>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
