import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    setShowModal(true); // open the modal
  }

  function confirmLogout() {
    localStorage.removeItem("user"); // remove logged-in user
    setShowModal(false);
    navigate("/login"); // redirect
  }

  function cancelLogout() {
    setShowModal(false); // close modal without logging out
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold 
                   hover:bg-red-600 transition shadow"
      >
        Logout
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <p className="mb-4 font-semibold text-gray-800">Are you sure you want to logout?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
