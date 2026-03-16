// src/components/Sidebar.jsx
const Sidebar = () => {
  const menuItems = [
    "Dashboard",
    "Supplier Management",
    "Area Assignment",
    "Beneficiaries",
    "Reports",
    "User Management",
    "Audit Logs",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-5">
      <div className="text-xl font-bold mb-6">SEDMS</div>
      <p className="text-sm text-purple-300 mb-4">Logged in as Dr. Kassahun Tadesse</p>
      <div className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item}
              className="p-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="mt-4 p-2 bg-red-500 rounded hover:bg-red-600">Sign Out</button>
    </aside>
  );
};

export default Sidebar;