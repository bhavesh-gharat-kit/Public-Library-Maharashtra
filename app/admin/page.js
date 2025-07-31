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

      const res = await fetch(`/api/admin/users?${queryParams}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");

      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit]);

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
          console.log(error);
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
        {/* Top Bar */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Search */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="p-2 border rounded w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              <SearchIcon size={18} /> Search
            </button>
          </div>

          {/* Limit Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="p-2 border rounded focus:outline-none"
            >
              {[10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  Show {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add User */}
          <button
            onClick={() => {
              setShowAddUserModal(true);
            }}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            <PlusCircleIcon size={18} /> Add User
          </button>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-600">No users found.</div>
        ) : (
          <div className="overflow-x-auto shadow rounded border">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">User ID</th>
                  <th className="py-3 px-4 text-left">Contact No</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={user.id}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4">
                      {(currentPage - 1) * limit + i + 1}
                    </td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.userId}</td>
                    <td className="py-2 px-4">{user.contactNo}</td>
                    <td className="py-2 px-4">
                      {new Date(user.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2 px-4 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => setEditUser(user)}
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      >
                        <Delete size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 p-4 border-t">
              <button
                className="p-2 border rounded disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                className="p-2 border rounded disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <button
                className="p-2 border rounded disabled:opacity-50"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight size={16} />
              </button>
              <button
                className="p-2 border rounded disabled:opacity-50"
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
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          libraryId: 1, // assuming static for now
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add user");

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
