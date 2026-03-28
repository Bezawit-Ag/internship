import React, { useState } from 'react';
import { Check, X, Search, Clock, FileWarning } from 'lucide-react';

const initialBeneficiaries = [
  { id: 1, name: "Abebe Kebede", kebele: "01", resourceRequested: "Home Solar System", submittedBy: "Encoder_01", status: "Pending", date: "2023-11-01" },
  { id: 2, name: "Fatima Hussein", kebele: "04", resourceRequested: "Solar Lantern", submittedBy: "Encoder_02", status: "Pending", date: "2023-11-02" },
  { id: 3, name: "Dawit Tadesse", kebele: "02", resourceRequested: "Off-grid System", submittedBy: "Encoder_01", status: "Pending", date: "2023-11-03" },
];

const ApproveBeneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [adjustmentModal, setAdjustmentModal] = useState({ isOpen: false, id: null, comment: '' });

  const handleApprove = (id) => {
    setBeneficiaries(beneficiaries.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
  };

  const handleOpenAdjustment = (id) => {
    setAdjustmentModal({ isOpen: true, id: id, comment: '' });
  };

  const handleCloseAdjustment = () => {
    setAdjustmentModal({ isOpen: false, id: null, comment: '' });
  };

  const handleSubmitAdjustment = () => {
    if (!adjustmentModal.comment.trim()) return;
    
    setBeneficiaries(beneficiaries.map(b => 
      b.id === adjustmentModal.id ? { ...b, status: 'Adjustment Needed', comment: adjustmentModal.comment } : b
    ));
    handleCloseAdjustment();
  };

  const filtered = beneficiaries.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const pendingCount = beneficiaries.filter(b => b.status === 'Pending').length;

  return (
    <>
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Approve Beneficiaries</h3>
            <p className="text-slate-500 mt-1">Review and approve daily beneficiary registrations.</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 text-amber-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
            <Clock className="w-5 h-5 text-amber-500" />
            {pendingCount} Pending Approvals
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="text"
                  placeholder="Search beneficiaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700"
               />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-sm border-b border-slate-100">
                  <th className="p-4 font-medium">Beneficiary Name</th>
                  <th className="p-4 font-medium">Kebele</th>
                  <th className="p-4 font-medium">Resource Requested</th>
                  <th className="p-4 font-medium">Submitted By</th>
                  <th className="p-4 font-medium">Submission Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((beneficiary) => (
                  <tr key={beneficiary.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-medium text-slate-800">{beneficiary.name}</td>
                    <td className="p-4 text-slate-600">{beneficiary.kebele}</td>
                    <td className="p-4 text-slate-600">{beneficiary.resourceRequested}</td>
                    <td className="p-4 text-slate-600">{beneficiary.submittedBy}</td>
                    <td className="p-4 text-slate-500 text-sm">{beneficiary.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        beneficiary.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                        beneficiary.status === 'Adjustment Needed' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {beneficiary.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      {beneficiary.status === 'Pending' && (
                        <>
                          <button onClick={() => handleApprove(beneficiary.id)} className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleOpenAdjustment(beneficiary.id)} className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors" title="Request Adjustment">
                            <FileWarning className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      No beneficiaries found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {adjustmentModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3 text-orange-600">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <FileWarning className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Request Adjustment</h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reason for adjustment / Comments
              </label>
              <textarea
                autoFocus
                value={adjustmentModal.comment}
                onChange={(e) => setAdjustmentModal({ ...adjustmentModal, comment: e.target.value })}
                placeholder="E.g., Missing Kebele ID attachment, wrong resource requested..."
                className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-slate-700"
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={handleCloseAdjustment}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitAdjustment}
                disabled={!adjustmentModal.comment.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveBeneficiary;
