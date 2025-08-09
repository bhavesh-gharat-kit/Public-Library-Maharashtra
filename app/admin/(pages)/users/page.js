"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  EyeIcon,
  PlusCircleIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  XIcon,
  Pencil,
  Delete,
} from "lucide-react";
import { CustomConfirm, FullScreenLoader, UserModal } from "@/components";
import { axios } from "@/utils";
import toast from "react-hot-toast";
import { scrollToTop } from "@/lib/helperFunctions";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit,
        searchTerm,
      });

      const res = await axios.get(`/api/admin/users?${queryParams}`);
      const data = await res.data;

      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
      scrollToTop();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit]);
  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    CustomConfirm({
      isOpen: true,
      onConfirm: async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await axios.delete(`/api/admin/users/${userId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await res.data;

          if (!data?.success)
            throw new Error(data.message || "Failed to delete user");

          setUsers((prev) => prev.filter((user) => user.id !== userId));

          toast.success("User deleted successfully.");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {},
      message: "Are you sure to delete this user?",
      theme: "red",
    });
  };

  if (loading) return <FullScreenLoader />;

  return (
    <>
      <div className="w-full p-4 pb-20 max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          {/* Search */}
          <div className="w-full md:w-auto flex flex-row gap-2 flex-1">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              <SearchIcon size={18} />
              Search
            </button>
          </div>

          {/* Limit Dropdown */}
          <div className="w-full md:w-auto flex flex-row gap-2 flex-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="limit"
                className="text-sm font-medium text-gray-700"
              >
                Show
              </label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                {[10, 20, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Add User */}
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
            >
              <PlusCircleIcon size={18} />
              Add User
            </button>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-600">No users found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-xl border border-gray-200 rounded-2xl">
            <table className="min-w-full text-sm table-auto rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-300">#</th>
                  <th className="py-3 px-4 border-b border-gray-300">Name</th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    User ID
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Contact No
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">Date</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-3 px-4 text-gray-800">
                      {(currentPage - 1) * limit + i + 1}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-gray-800">{user.userId}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {user.contactNo}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setEditUser(user)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full focus:outline-none"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full focus:outline-none"
                        >
                          <Delete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 bg-gray-50">
              <button
                className="p-2 border border-gray-300 bg-white rounded disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                className="p-2 border border-gray-300 bg-white rounded disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 text-sm text-gray-700">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <button
                className="p-2 border border-gray-300 bg-white rounded disabled:opacity-50"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight size={16} />
              </button>
              <button
                className="p-2 border border-gray-300 bg-white rounded disabled:opacity-50"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      {showAddUserModal && (
        <UserModal
          mode="add"
          onClose={() => {
            setShowAddUserModal(false);
          }}
          onSuccess={(newUser) => {
            setUsers((prevUsers) => [...prevUsers, newUser]);
          }}
        />
      )}
      {editUser && (
        <UserModal
          mode="edit"
          user={editUser}
          onClose={() => {
            setEditUser(null);
          }}
          onSuccess={(newUser) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) => (user.id === newUser.id ? newUser : user))
            );
          }}
        />
      )}
    </>
  );
};

const AddUserModal = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    userId: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/admin/users", {
        ...formData,
      });

      const data = res.data;
      if (!data.success)
        return toast.error(
          data.message || data.error || "Error while adding user"
        );
      onUserAdded(); // trigger refetch in parent
      onClose(); // close modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            required
            value={formData.userId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact No"
            required
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersPage;
