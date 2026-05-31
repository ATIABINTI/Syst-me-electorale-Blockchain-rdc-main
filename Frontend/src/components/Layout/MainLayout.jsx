import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Systéme de vote </h2>
        <ul>
          <li>Dashboard</li>
          <li>Voter</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;