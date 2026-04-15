import React, { useState, useEffect } from 'react';
import { Search, AlertOctagon, Wrench, CheckCircle2, FileText, Eye } from 'lucide-react';

const ProblemApproval = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/problems`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProblems(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = problems.filter(p => 
    p.beneficiary_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.equipment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: problems.length,
    open: problems.filter(p => p.status === 'Open' || p.status === 'Pending').length,
    repair: problems.filter(p => p.status === 'Under Repair').length,
    resolved: problems.filter(p => p.status === 'Resolved').length
  };

  const getStatusColor = (status) => {
    if (status === 'Open' || status === 'Pending') return 'text-red-700 bg-red-50 border-red-200';
    if (status === 'Under Repair') return 'text-amber-700 bg-amber-50 border-amber-200';
    if (status === 'Acknowledged') return 'text-blue-700 bg-blue-50 border-blue-200';
    if (status === 'Resolved') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/api/problems/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchProblems();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800">Equipment Issues</h3>
        <p className="text-slate-500 mt-1">Review zonal problem reports and maintenance statuses.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium text-sm">Total Reported</p>
              <h2 className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 font-medium text-sm">Open Needs Action</p>
              <h2 className="text-3xl font-bold text-red-600 mt-1">{stats.open}</h2>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertOctagon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-800 font-medium text-sm">Under Repair</p>
              <h2 className="text-3xl font-bold text-amber-600 mt-1">{stats.repair}</h2>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Wrench className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
               <p className="text-emerald-800 font-medium text-sm">Resolved</p>
               <h2 className="text-3xl font-bold text-emerald-600 mt-1">{stats.resolved}</h2>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Problem Reports</h3>
           <div className="relative max-w-md">
             <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by equipment or beneficiary..."
               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs tracking-wider">
               <tr>
                 <th className="p-4">EQUIPMENT / S.NO</th>
                 <th className="p-4">BENEFICIARY</th>
                 <th className="p-4">LOCATION</th>
                 <th className="p-4">REPORTED</th>
                 <th className="p-4">STATUS</th>
                 <th className="p-4 text-center">ACTION</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No problem reports found.
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{p.equipment}</div>
                    <div className="text-xs text-slate-400">{p.details?.serialNumber || 'N/A'}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{p.beneficiary_name}</td>
                  <td className="p-4">
                    <div className="text-slate-800 font-medium">{p.woreda}</div>
                    <div className="text-xs text-slate-400">{p.zone}</div>
                  </td>
                  <td className="p-4 text-slate-500">{new Date(p.created_at).toISOString().split('T')[0]}</td>
                  <td className="p-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(p.status)}`}>
                        {p.status}
                     </span>
                  </td>
                  <td className="p-4 text-center">
                     <select 
                       className="text-xs px-2 py-1 bg-slate-50 border border-slate-200 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                       value={p.status}
                       onChange={(e) => updateStatus(p.id, e.target.value)}
                     >
                       <option value="Open">Open</option>
                       <option value="Pending">Pending</option>
                       <option value="Acknowledged">Acknowledged</option>
                       <option value="Under Repair">Under Repair</option>
                       <option value="Resolved">Resolved</option>
                     </select>
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

export default ProblemApproval;
