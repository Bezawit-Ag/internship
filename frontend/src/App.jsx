// src/App.jsx
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Suppliers</h2>
          <p className="text-2xl font-bold">124</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Beneficiaries</h2>
          <p className="text-2xl font-bold">45,280</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Units Distributed</h2>
          <p className="text-2xl font-bold">41,289</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Active Zones</h2>
          <p className="text-2xl font-bold">11</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Pending Approvals</h2>
          <p className="text-2xl font-bold">342</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Equipment Issues</h2>
          <p className="text-2xl font-bold">28</p>
        </div>
      </div>

      {/* Charts and tables (placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow h-64">Distribution Trend Chart</div>
        <div className="bg-white p-4 rounded shadow h-64">Equipment Type Chart</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded shadow h-64">Beneficiaries by Zone</div>
        <div className="bg-white p-4 rounded shadow h-64">Supplier Performance</div>
      </div>
    </MainLayout>
  );
}

export default App;