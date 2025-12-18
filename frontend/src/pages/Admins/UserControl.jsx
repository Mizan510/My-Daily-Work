import React, { useEffect, useState } from "react";

export default function UserControl() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // GET LOGGED-IN ADMIN
  const admin = JSON.parse(localStorage.getItem("user"));
  const adminId = admin?._id;

  // FETCH USERS
  async function fetchUsers() {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/my-users/${adminId}`
      );
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (err) {
      console.log("Fetch users error:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!adminId) return;
    fetchUsers();
  }, [adminId]);

  // DELETE USER
  async function deleteUser(userId) {
    setDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/delete-user/${userId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setToast({ type: "success", message: "User deleted successfully" });
        fetchUsers();
      } else {
        setToast({ type: "error", message: "Failed to delete user" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Server error occurred" });
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  }

  // AUTO HIDE TOAST
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Control Panel</h1>

      {users.length === 0 ? (
        <p className="text-gray-600">No users registered under you yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{u.name}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border">
                    {confirmDelete === u._id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-semibold">
                          Are you sure?
                        </span>
                        <button
                          onClick={() => deleteUser(u._id)}
                          disabled={deleting}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {deleting ? "Deleting..." : "Yes"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          disabled={deleting}
                          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(u._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TOAST MESSAGE */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
