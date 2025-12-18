import React, { useEffect, useState } from "react";
import axios from "axios";
import UserReportA from "../../components/UserReportA";
import UserReportB from "../../components/UserReportB";
import UserReportC from "../../components/UserReportC";
import UserReportD from "../../components/UserReportD";
import UserReportE from "../../components/UserReportE";
import UserReportN from "../../components/UserReportN";

const AllUserReports = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [usersUnderAdmin, setUsersUnderAdmin] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [allReports, setAllReports] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    N: [],
  });

  // Loading & toast state
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const masterName = "Md. Mizanur Rahman";

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(
        "https://my-daily-work.onrender.com/api/auth/get-admins"
      );
      setAdmins(res.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  };

  const fetchUsersUnderAdmin = async (adminId) => {
    try {
      const res = await axios.get(
        `https://my-daily-work.onrender.com/api/auth/my-users/${adminId}`
      );
      setUsersUnderAdmin(res.data.users || []);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const fetchAllReports = async () => {
    try {
      const routes = ["A", "B", "C", "D", "E", "N"];
      const requests = routes.map((r) =>
        axios.get(`https://my-daily-work.onrender.com/api/form-data${r}`)
      );
      const responses = await Promise.all(requests);

      setAllReports({
        A: responses[0].data,
        B: responses[1].data,
        C: responses[2].data,
        D: responses[3].data,
        E: responses[4].data,
        N: responses[5].data,
      });
    } catch (err) {
      console.error("Report fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchAllReports();
  }, []);

  useEffect(() => {
    if (selectedAdmin) {
      fetchUsersUnderAdmin(selectedAdmin);
      setSelectedUser("");
    }
  }, [selectedAdmin]);

  const askDelete = () => {
    if (!selectedUser) return showToast("error", "Select a user first");
    if (!startDate || !endDate)
      return showToast("error", "Select both start and end dates");

    setConfirmDelete(true);
  };

  const confirmDeleteAction = async () => {
    setLoadingDelete(true);
    try {
      const routes = ["A", "B", "C", "D", "E", "N"];
      await Promise.all(
        routes.map((r) =>
          axios.delete(
            `https://my-daily-work.onrender.com/api/form-data${r}/delete-by-date-range`,
            {
              params: { user: selectedUser, startDate, endDate },
            }
          )
        )
      );
      showToast("success", "Reports deleted successfully");
      fetchAllReports();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to delete reports");
    } finally {
      setLoadingDelete(false);
      setConfirmDelete(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const filterByUser = (reports) =>
    reports.filter(
      (r) =>
        r.userName?.trim().toLowerCase() === selectedUser.trim().toLowerCase()
    );

  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Master – All User Reports
      </h2>

      {/* Admin & User Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Master
          </label>
          <select
            value={masterName}
            disabled
            className="w-full border px-3 py-2 rounded-lg bg-gray-100"
          >
            <option>{masterName}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Select Admin
          </label>
          <select
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">-- Select Admin --</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Select User Under Admin
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            disabled={!selectedAdmin}
            className="w-full border px-3 py-2 rounded-lg disabled:bg-gray-100"
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

      {/* Delete by Date Range */}
      {selectedUser && (
        <div className="mb-10 bg-red-50 p-5 rounded-lg border border-red-300">
          <h3 className="text-xl font-bold mb-3 text-red-700">
            Delete Reports by Date Range
          </h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
            <button
              onClick={askDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              {loadingDelete ? "Deleting..." : "Delete Reports"}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed bottom-10 right-10 bg-red-600 text-white p-5 rounded-lg shadow-lg z-50 flex flex-col gap-3">
          <p>
            Are you sure you want to delete reports for {selectedUser} from{" "}
            {startDate} to {endDate}?
          </p>
          <div className="flex gap-2">
            <button
              onClick={confirmDeleteAction}
              disabled={loadingDelete}
              className="bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              {loadingDelete ? "Deleting..." : "Yes"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              disabled={loadingDelete}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Toast Messages */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      {/* Show User Reports */}
      {selectedUser ? (
        <div className="space-y-6">
          {filterByUser(allReports.A).length > 0 && (
            <UserReportA
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.A)}
            />
          )}
          {filterByUser(allReports.B).length > 0 && (
            <UserReportB
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.B)}
            />
          )}
          {filterByUser(allReports.C).length > 0 && (
            <UserReportC
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.C)}
            />
          )}
          {filterByUser(allReports.D).length > 0 && (
            <UserReportD
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.D)}
            />
          )}
          {filterByUser(allReports.E).length > 0 && (
            <UserReportE
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.E)}
            />
          )}
          {filterByUser(allReports.N).length > 0 && (
            <UserReportN
              loggedInUser={selectedUser}
              allReports={filterByUser(allReports.N)}
            />
          )}
        </div>
      ) : (
        <p className="text-red-600 text-center text-lg font-semibold">
          Select admin and user to view reports
        </p>
      )}
    </div>
  );
};

export default AllUserReports;
