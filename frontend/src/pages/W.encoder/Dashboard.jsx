import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegisterBeneficiary from './Register Beneficiary';
import RegisterProblem from './Register Problem';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Beneficiary Registry');

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header activeMenu={activeMenu} />

        <main className="flex-1 p-8 overflow-y-auto">
          {activeMenu === 'Beneficiary Registry' && <RegisterBeneficiary />}
          {activeMenu === 'Problem Registry' && <RegisterProblem />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
