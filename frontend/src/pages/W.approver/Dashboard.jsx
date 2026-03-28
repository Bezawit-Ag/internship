import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ApproveBeneficiary from './Approve Beneficiary';
import ApproveProblem from './Approve Problem';

const WoredaApproverDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Approve Beneficiaries');

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header activeMenu={activeMenu} />

        <main className="flex-1 p-8 overflow-y-auto w-full">
          {activeMenu === 'Approve Beneficiaries' && <ApproveBeneficiary />}
          {activeMenu === 'Approve Problems' && <ApproveProblem />}
        </main>
      </div>
    </div>
  );
};

export default WoredaApproverDashboard;
