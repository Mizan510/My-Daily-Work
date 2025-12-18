import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function AllAdminControl() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Loading states
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingExportAdmins, setLoadingExportAdmins] = useState(false);
  const [loadingExportUsers, setLoadingExportUsers] = useState(false);
  const [loadingAction, setLoadingAction] = useState({}); // Track per user/admin actions

  // Confirmation & Toast
  const [confirmDelete, setConfirmDelete] = useState(null); // { id, type, actionType }
  const [toast, setToast] = useState(null);

  function formatBD(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setCurrentUser(user);
    getAdmins();
    getUsers();
  }, []);

  async function getAdmins() {
    setLoadingAdmins(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/get-admins");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAdmins(false);
    }
  }

  async function getUsers() {
    setLoadingUsers(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/get-users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUsers(false);
    }
  }

  // ================= DELETE ADMIN =================
  async function deleteAdmin(id) {
    setLoadingAction((prev) => ({ ...prev, [id + "_deleteAdmin"]: true }));
    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete-admin/${id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ type: "success", message: "Admin deleted successfully" });
        getAdmins();
      } else {
        setToast({ type: "error", message: "Failed to delete admin" });
      }
    } catch {
      setToast({ type: "error", message: "Server error occurred" });
    } finally {
      setLoadingAction((prev) => ({ ...prev, [id + "_deleteAdmin"]: false }));
      setConfirmDelete(null);
    }
  }

  // ================= DELETE USER =================
  async function deleteUser(id) {
    setLoadingAction((prev) => ({ ...prev, [id + "_deleteUser"]: true }));
    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete-user/${id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ type: "success", message: "User deleted successfully" });
        getUsers();
      } else {
        setToast({ type: "error", message: "Failed to delete user" });
      }
    } catch {
      setToast({ type: "error", message: "Server error occurred" });
    } finally {
      setLoadingAction((prev) => ({ ...prev, [id + "_deleteUser"]: false }));
      setConfirmDelete(null);
    }
  }

  // ================= TOGGLE ACTIVE =================
  async function toggleAdminActive(id) {
    setLoadingAction((prev) => ({ ...prev, [id + "_toggleAdmin"]: true }));
    try {
      const res = await fetch(`http://localhost:5000/api/auth/toggle-admin-active/${id}`, { method: "PUT" });
      if (res.ok) getAdmins();
    } finally {
      setLoadingAction((prev) => ({ ...prev, [id + "_toggleAdmin"]: false }));
      setConfirmDelete(null);
    }
  }

  async function toggleUserActive(id) {
    setLoadingAction((prev) => ({ ...prev, [id + "_toggleUser"]: true }));
    try {
      const res = await fetch(`http://localhost:5000/api/auth/toggle-user-active/${id}`, { method: "PUT" });
      if (res.ok) getUsers();
    } finally {
      setLoadingAction((prev) => ({ ...prev, [id + "_toggleUser"]: false }));
      setConfirmDelete(null);
    }
  }

  // ================= EXPORT EXCEL =================
  async function exportAdminsExcel() {
    setLoadingExportAdmins(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Admins");
      sheet.columns = [
        { header: "Name", key: "name", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Created Time (BD)", key: "created", width: 25 },
        { header: "Status Changed (BD)", key: "updated", width: 25 },
        { header: "Status", key: "status", width: 15 },
      ];
      sheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E79" } };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      });
      admins.forEach((a) => {
        const row = sheet.addRow({
          name: a.name,
          email: a.email,
          created: formatBD(a.createdAt),
          updated: formatBD(a.updatedAt),
          status: a.isActive ? "Active" : "Inactive",
        });
        row.eachCell((cell) => {
          cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      });
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "All_Admins.xlsx");
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingExportAdmins(false);
    }
  }

  async function exportUsersExcel() {
    setLoadingExportUsers(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Users");
      sheet.columns = [
        { header: "Name", key: "name", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Created By", key: "createdBy", width: 25 },
        { header: "Created Time (BD)", key: "created", width: 25 },
        { header: "Status Changed (BD)", key: "updated", width: 25 },
        { header: "Status", key: "status", width: 15 },
      ];
      sheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E79" } };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      });
      users.forEach((u) => {
        const row = sheet.addRow({
          name: u.name,
          email: u.email,
          createdBy: u.createdBy ? u.createdBy.name : "Master Admin",
          created: formatBD(u.createdAt),
          updated: formatBD(u.updatedAt),
          status: u.isActive ? "Active" : "Inactive",
        });
        row.eachCell((cell) => {
          cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      });
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "Users.xlsx");
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingExportUsers(false);
    }
  }

  // ================= TOAST =================
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <div className="p-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Admin & User Management</h1>

      {/* ===================== ADMIN LIST ===================== */}
      <h2 className="text-2xl font-bold mb-2">All Admins</h2>
      <button
        onClick={exportAdminsExcel}
        disabled={loadingExportAdmins}
        className={`mb-3 px-4 py-2 rounded ${
          loadingExportAdmins ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {loadingExportAdmins ? "Exporting..." : "Export Admins to Excel"}
      </button>

      <div className="overflow-x-auto mb-10">
        <table className="w-full border border-gray-500 border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Created Time (BD)</th>
              <th className="p-3 border">Status Changed (BD)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingAdmins ? (
              <tr>
                <td colSpan="6" className="text-center p-3">Loading admins...</td>
              </tr>
            ) : admins.length ? (
              admins.map((admin) => (
                <tr key={admin._id}>
                  <td className="p-3 border">{admin.name}</td>
                  <td className="p-3 border">{admin.email}</td>
                  <td className="p-3 border">{formatBD(admin.createdAt)}</td>
                  <td className="p-3 border">{formatBD(admin.updatedAt)}</td>
                  <td className="p-3 border text-center">{admin.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-3 border text-center flex justify-center gap-2">
                    <button
                      onClick={() => setConfirmDelete({ id: admin._id, type: "admin", actionType: "toggle" })}
                      disabled={loadingAction[admin._id + "_toggleAdmin"]}
                      className={`px-3 py-1 rounded ${
                        admin.isActive ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      {loadingAction[admin._id + "_toggleAdmin"] ? "Processing..." : admin.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ id: admin._id, type: "admin", actionType: "delete" })}
                      disabled={loadingAction[admin._id + "_deleteAdmin"]}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      {loadingAction[admin._id + "_deleteAdmin"] ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan="6">No admins found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===================== USER LIST ===================== */}
      <h2 className="text-2xl font-bold mb-2">All Users</h2>
      <button
        onClick={exportUsersExcel}
        disabled={loadingExportUsers}
        className={`mb-3 px-4 py-2 rounded ${
          loadingExportUsers ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {loadingExportUsers ? "Exporting..." : "Export Users to Excel"}
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-500 border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Created By</th>
              <th className="p-3 border">Created Time (BD)</th>
              <th className="p-3 border">Status Changed (BD)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan="7" className="text-center p-3">Loading users...</td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.createdBy ? user.createdBy.name : "Master Admin"}</td>
                  <td className="p-3 border">{formatBD(user.createdAt)}</td>
                  <td className="p-3 border">{formatBD(user.updatedAt)}</td>
                  <td className="p-3 border text-center">{user.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-3 border text-center flex justify-center gap-2">
                    <button
                      onClick={() => setConfirmDelete({ id: user._id, type: "user", actionType: "toggle" })}
                      disabled={loadingAction[user._id + "_toggleUser"]}
                      className={`px-3 py-1 rounded ${
                        user.isActive ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      {loadingAction[user._id + "_toggleUser"] ? "Processing..." : user.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ id: user._id, type: "user", actionType: "delete" })}
                      disabled={loadingAction[user._id + "_deleteUser"]}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      {loadingAction[user._id + "_deleteUser"] ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan="7">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CONFIRMATION MODAL ================= */}
      {confirmDelete && (
        <div className="fixed bottom-10 right-10 bg-red-600 text-white p-5 rounded-lg shadow-lg z-50 flex flex-col gap-3">
          <p>
            Are you sure you want to {confirmDelete.actionType === "delete" ? "delete" : "toggle status of"} 
            {confirmDelete.type === "admin" ? " this admin" : " this user"}?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (confirmDelete.actionType === "delete") {
                  confirmDelete.type === "admin"
                    ? await deleteAdmin(confirmDelete.id)
                    : await deleteUser(confirmDelete.id);
                } else {
                  confirmDelete.type === "admin"
                    ? await toggleAdminActive(confirmDelete.id)
                    : await toggleUserActive(confirmDelete.id);
                }
                setConfirmDelete(null);
              }}
              className="bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(null)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
