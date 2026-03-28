import React, { useState } from 'react';
import { Search, Clock, CheckCircle, MessageSquareWarning } from 'lucide-react';

const initialProblems = [
  { id: 1, title: "Delayed Solar Panel Delivery", category: "Logistics", kebele: "01", submittedBy: "Encoder_01", status: "Pending", urgency: "High", date: "2023-11-04" },
  { id: 2, title: "Faulty Battery Component", category: "Hardware", kebele: "03", submittedBy: "Encoder_03", status: "Pending", urgency: "Medium", date: "2023-11-04" },
  { id: 3, title: "Beneficiary Address Mismatch", category: "Data Issue", kebele: "02", submittedBy: "Encoder_02", status: "Pending", urgency: "Low", date: "2023-11-05" },
];

const ApproveProblem = () => {
  const [problems, setProblems] = useState(initialProblems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAcknowledge = (id) => {
    setProblems(problems.map(p => p.id === id ? { ...p, status: 'Acknowledged' } : p));
  };

  const handleResolve = (id) => {
    setProblems(problems.map(p => p.id === id ? { ...p, status: 'Resolved' } : p));
  };

  const filtered = problems.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const pendingCount = problems.filter(p => p.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Approve Problems</h3>
          <p className="text-slate-500 mt-1">Review, acknowledge, and resolve reported field issues.</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 text-orange-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <MessageSquareWarning className="w-5 h-5 text-orange-500" />
          {pendingCount} Pending Issues
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input
                type="text"
                placeholder="Search problems..."
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
                <th className="p-4 font-medium">Issue Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Kebele</th>
                <th className="p-4 font-medium">Date Reported</th>
                <th className="p-4 font-medium">Urgency</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((problem) => (
                <tr key={problem.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 font-medium text-slate-800">{problem.title}</td>
                  <td className="p-4 text-slate-600">{problem.category}</td>
                  <td className="p-4 text-slate-600">{problem.kebele}</td>
                  <td className="p-4 text-slate-500 text-sm">{problem.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      problem.urgency === 'High' ? 'text-red-700 bg-red-50' :
                      problem.urgency === 'Medium' ? 'text-orange-700 bg-orange-50' :
                      'text-blue-700 bg-blue-50'
                    }`}>
                      {problem.urgency}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      problem.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                      problem.status === 'Acknowledged' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {problem.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    {problem.status === 'Pending' && (
                      <button onClick={() => handleAcknowledge(problem.id)} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
                        Acknowledge
                      </button>
                    )}
                    {problem.status !== 'Resolved' && (
                      <button onClick={() => handleResolve(problem.id)} className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200" title="Mark as Resolved">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No problems found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveProblem;
