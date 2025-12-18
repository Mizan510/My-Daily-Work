import React, { useState, useEffect } from "react";
import axios from "axios";
import UserReportA from "../../components/UserReportA";
import UserReportB from "../../components/UserReportB";
import UserReportC from "../../components/UserReportC";
import UserReportD from "../../components/UserReportD";
import UserReportE from "../../components/UserReportE";
import UserReportN from "../../components/UserReportN";

const MyUserReports = () => {
  const [allReports, setAllReports] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    N: [],
  });
  const [adminName, setAdminName] = useState("");
  const [usersUnderAdmin, setUsersUnderAdmin] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Load admin info
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("user"));
    setAdminName(admin?.name || "");
  }, []);

  // Fetch reports
  const fetchReports = async () => {
    try {
      const [a, b, c, d, e, n] = await Promise.all([
        axios.get("https://my-daily-work.onrender.com/api/form-dataa"),
        axios.get("https://my-daily-work.onrender.com/api/form-datab"),
        axios.get("https://my-daily-work.onrender.com/api/form-datac"),
        axios.get("https://my-daily-work.onrender.com/api/form-datad"),
        axios.get("https://my-daily-work.onrender.com/api/form-datae"),
        axios.get("https://my-daily-work.onrender.com/api/form-datan"),
      ]);

      setAllReports({
        A: a.data,
        B: b.data,
        C: c.data,
        D: d.data,
        E: e.data,
        N: n.data,
      });
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  // Fetch users under admin
  const fetchUsers = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      const adminId = admin?._id;
      if (!adminId) return;

      const res = await axios.get(
        `https://my-daily-work.onrender.com/api/auth/my-users/${adminId}`
      );
      setUsersUnderAdmin(res.data.users || []);
    } catch (err) {
      console.error("User fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (adminName) {
      fetchReports();
      fetchUsers();
    }
  }, [adminName]);

  // Filter reports by admin's users and selected user
  const filterReports = (reports) => {
    const adminUserNames = usersUnderAdmin.map((u) =>
      u.name?.trim().toLowerCase()
    );

    let filtered = reports.filter((r) =>
      adminUserNames.includes(r.userName?.trim().toLowerCase())
    );

    if (!showAllUsers && selectedUser) {
      filtered = filtered.filter(
        (r) =>
          r.userName?.trim().toLowerCase() === selectedUser.trim().toLowerCase()
      );
    }

    return filtered;
  };

  const filteredReports = {
    A: filterReports(allReports.A),
    B: filterReports(allReports.B),
    C: filterReports(allReports.C),
    D: filterReports(allReports.D),
    E: filterReports(allReports.E),
    N: filterReports(allReports.N),
  };

  const hasAnyReport = Object.values(filteredReports).some(
    (reports) => reports.length > 0
  );

  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        User Reports Dashboard
      </h2>

      {/* Filters Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Logged-in Admin
            </label>
            <select
              value={adminName}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700 font-semibold cursor-not-allowed"
            >
              <option>{adminName}</option>
            </select>
          </div>

          {/* User */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select User Under This Admin
            </label>
            <select
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
                setShowAllUsers(false); // disable all user toggle when user selected
              }}
              className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">-- Select User --</option>
              {usersUnderAdmin.map((user) => (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="mt-4 space-y-6">
        {hasAnyReport ? (
          <>
            {filteredReports.A.length > 0 && (
              <UserReportA
                loggedInUser={selectedUser}
                allReports={filteredReports.A}
                showUserName
              />
            )}
            {filteredReports.B.length > 0 && (
              <UserReportB
                loggedInUser={selectedUser}
                allReports={filteredReports.B}
                showUserName
              />
            )}
            {filteredReports.C.length > 0 && (
              <UserReportC
                loggedInUser={selectedUser}
                allReports={filteredReports.C}
                showUserName
              />
            )}
            {filteredReports.D.length > 0 && (
              <UserReportD
                loggedInUser={selectedUser}
                allReports={filteredReports.D}
                showUserName
              />
            )}
            {filteredReports.E.length > 0 && (
              <UserReportE
                loggedInUser={selectedUser}
                allReports={filteredReports.E}
                showUserName
              />
            )}
            {filteredReports.N.length > 0 && (
              <UserReportN
                loggedInUser={selectedUser}
                allReports={filteredReports.N}
                showUserName
              />
            )}
          </>
        ) : (
          <div className="text-gray-500 font-semibold text-center py-6">
            No submitted data available
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUserReports;
