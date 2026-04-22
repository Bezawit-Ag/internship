import { Search, Bell, User, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header({ selectedZone }) {
   const location = useLocation();
   const activeMenu = location.pathname.includes("problems") ? "Problem Approval" : "Approval Queue";

   return (
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10 w-full rounded-none md:pl-8 shadow-sm">
         <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            <span>Zone Approver Console</span>
            <span className="mx-1 text-slate-300">/</span>
            <span className="text-blue-600 font-bold">{activeMenu}</span>
            <span className="mx-1 text-slate-300">/</span>
            <span className="text-emerald-700 font-bold">{selectedZone}</span>
         </div>

         <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="text"
                  placeholder="Search globally..."
                  className="pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-slate-700"
               />
            </div>

            <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
               <div className="text-right hidden sm:block">
                   <span className="block text-sm font-bold text-slate-800">Zone Approver</span>
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">APPROVER</span>
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-blue-100 bg-blue-50 flex items-center justify-center text-blue-500">
                  <User className="w-5 h-5" />
               </div>
            </div>
         </div>
      </header>
   );
}
