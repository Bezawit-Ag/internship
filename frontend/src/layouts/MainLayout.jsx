// src/layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <div>
            <span className="text-gray-500">Main Console &gt; </span>
            <span className="font-bold">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search resources..."
              className="border rounded px-2 py-1"
            />
            <div className="relative">
              <span className="text-red-500 font-bold absolute -top-1 -right-1 text-xs">3</span>
              <button className="p-2 rounded-full bg-gray-200">🔔</button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Dr. Kassahun Tadesse</span>
              <span className="text-gray-400 text-sm">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;