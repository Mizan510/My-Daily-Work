import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MasterDashboard() {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState("");

  const handleNavigate = (path, buttonKey) => {
    setLoadingButton(buttonKey); // Start loading
    setTimeout(() => {
      navigate(path); // Navigate after a short delay
      setLoadingButton(""); // Reset loading (optional if navigation unmounts component)
    }, 500); // Simulate loading delay (you can adjust or remove if real async action exists)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Master Dashboard
        </h2>

        {/* MENU ITEMS AS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">All Admin Controls</h3>
            <p className="text-gray-600 mb-4">Manage & control all admins</p>
            <button
              onClick={() => handleNavigate("/all-admin-control", "admin")}
              disabled={loadingButton === "admin"}
              className={`px-4 py-2 rounded-xl ${
                loadingButton === "admin"
                  ? "bg-purple-400 cursor-not-allowed text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {loadingButton === "admin" ? "Loading..." : "➤ All Admin Controls"}
            </button>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">All User Reports</h3>
            <p className="text-gray-600 mb-4">View all report data</p>
            <button
              onClick={() => handleNavigate("/all-user-reports", "reports")}
              disabled={loadingButton === "reports"}
              className={`px-4 py-2 rounded-xl ${
                loadingButton === "reports"
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              {loadingButton === "reports" ? "Loading..." : "➤ All User Reports"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
