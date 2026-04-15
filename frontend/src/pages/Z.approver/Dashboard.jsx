import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ApprovalQueue from './ApprovalQueue';
import ProblemApproval from './ProblemApproval';

const ZoneApproverDashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto w-full">
          <Routes>
            <Route path="queue" element={<ApprovalQueue />} />
            <Route path="problems" element={<ProblemApproval />} />
            <Route path="/" element={<Navigate to="queue" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ZoneApproverDashboard;
