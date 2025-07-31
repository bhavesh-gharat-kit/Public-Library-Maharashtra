"use client";

import { axios } from "@/utils";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserModal = ({ mode = "add", user = {}, onClose, onSuccess }) => {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    userId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fill form when editing
  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
        userId: user.userId || "",
        password: "",
      });
    }
  }, [isEdit, user]);

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
      const url = isEdit ? `/api/admin/users/${user.id}` : `/api/admin/users`;
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...formData,
      };

      // Optionally remove password if blank in edit
      if (isEdit && !formData.password.trim()) {
        delete payload.password;
      }

      const res = await axios({
        method,
        url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.data;

      if (!data?.success)
        throw new Error(data.message || "Failed to save user");

      toast.success("User updated successfully.");
      onSuccess(data?.user);

      onClose();
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
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit User" : "Add New User"}
        </h2>

        {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}

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
            disabled={isEdit}
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
            placeholder={isEdit ? "Leave blank to keep unchanged" : "Password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update User"
              : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
