import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Check, X, ShieldAlert, ArrowLeft } from 'lucide-react';

const ApprovalQueue = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending Zone');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, [statusFilter]);

  const fetchQueue = async () => {
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : '';
      const res = await fetch(`http://localhost:8000/api/beneficiaries${qs}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBeneficiaries(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/beneficiaries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      });
      if (res.ok) {
        alert("Approved!");
        setSelectedItem(null);
        fetchQueue();
      }
    } catch (e) { console.error(e); }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/beneficiaries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' })
      });
      if (res.ok) {
        alert("Rejected!");
        setSelectedItem(null);
        fetchQueue();
      }
    } catch (e) { console.error(e); }
  };

  const filtered = beneficiaries.filter(b => 
    b.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.national_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === 'Pending Zone') return 'text-amber-700 bg-amber-50 border-amber-200';
    if (status === 'Approved') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (status === 'Rejected') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  // Details Modal Full View
  if (selectedItem) {
    return (
      <div className="max-w-7xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedItem(null)}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
             <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold text-slate-800">Approval Workflow</h2>
               <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
               </span>
             </div>
            <p className="text-slate-500 mt-1">Review applicant and survey data to make a final decision.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6 relative z-10 flex items-center gap-2">
                 Personal Information
               </h3>
               <div className="grid grid-cols-2 gap-y-6 text-sm relative z-10">
                 <div>
                   <span className="text-slate-400 block mb-1">Full Name</span>
                   <span className="font-bold text-slate-800">{selectedItem.full_name}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">National ID</span>
                   <span className="font-bold text-slate-800">{selectedItem.national_id || '-'}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">Phone Number</span>
                   <span className="font-bold text-slate-800">{selectedItem.phone}</span>
                 </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                 Location Details
               </h3>
               <div className="grid grid-cols-3 gap-y-6 text-sm">
                 <div>
                   <span className="text-slate-400 block mb-1">Zone</span>
                   <span className="font-bold text-slate-800">{selectedItem.zone}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">Woreda</span>
                   <span className="font-bold text-slate-800">{selectedItem.woreda}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">Kebele</span>
                   <span className="font-bold text-slate-800">{selectedItem.details?.kebele || '-'}</span>
                 </div>
               </div>
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                 Equipment Information
               </h3>
               <div className="grid grid-cols-2 gap-y-6 text-sm">
                 <div>
                   <span className="text-slate-400 block mb-1">Survey Type</span>
                   <span className="font-bold text-slate-800">{selectedItem.survey_type}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">Equipment Type</span>
                   <span className="font-bold text-slate-800">{selectedItem.equipment_type}</span>
                 </div>
                 <div>
                   <span className="text-slate-400 block mb-1">Supplier</span>
                   <span className="font-bold text-slate-800">{selectedItem.supplier || '-'}</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="col-span-1 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-500" /> Final Decision
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                This is the final approval stage. If approved, the beneficiary will be officially registered.
              </p>

              {selectedItem.status === 'Pending Zone' ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => handleApprove(selectedItem.id)}
                    className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <Check className="w-5 h-5" /> Approve Record
                  </button>
                  <button 
                    onClick={() => handleReject(selectedItem.id)}
                    className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold hover:bg-red-50 transition-all"
                  >
                    <X className="w-5 h-5" /> Reject Record
                  </button>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center text-sm font-semibold text-slate-500">
                  Decision has been made.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800">Approval Queue</h3>
        <p className="text-slate-500 mt-1">Review beneficiary surveys forwarded by Woreda Approvers.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending Zone">Pending Zone Approvals</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs tracking-wider">
              <tr>
                <th className="p-4">BENEFICIARY</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4">EQUIPMENT</th>
                <th className="p-4">SUPPLIER</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">DATE</th>
                <th className="p-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No records found matching your criteria.
                  </td>
                </tr>
              ) : filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{b.full_name}</div>
                    <div className="text-xs text-slate-400">{b.national_id || 'No ID'}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-800 font-medium">{b.woreda}</div>
                    <div className="text-xs text-slate-400">{b.zone}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-blue-600">{b.equipment_type}</div>
                    <div className="text-xs text-slate-500">{b.survey_type}</div>
                  </td>
                  <td className="p-4 text-slate-600">{b.supplier || '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{new Date(b.created_at).toISOString().split('T')[0]}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setSelectedItem(b)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-xs flex items-center justify-center gap-1 mx-auto"
                    >
                      <Eye className="w-4 h-4" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalQueue;
