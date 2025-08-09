"use client";

import { XIcon, InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axios } from "@/utils"; // Adjust path as needed

const IPModal = ({ mode = "add", ip = {}, onClose, onSuccess }) => {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    ipAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && ip) {
      setFormData({
        ipAddress: ip.ipAddress || "",
      });
    }
  }, [isEdit, ip]);

  const handleChange = (e) => {
    setFormData({ ...formData, ipAddress: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit
        ? `/api/admin/settings/allowed-ips/${ip.id}`
        : `/api/admin/settings/allowed-ips`;
      const method = isEdit ? "PUT" : "POST";

      const res = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;

      if (!data?.success)
        throw new Error(data.message || "Failed to save IP address");

      toast.success(
        isEdit ? "IP address updated successfully." : "IP address added."
      );
      onSuccess(data?.ip);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-2">
          {isEdit ? "Edit Allowed IP" : "Add New Allowed IP"}
        </h2>
        <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
          <InfoIcon size={16} />
          Enter a valid IPv4 address (e.g. 192.168.1.100)
        </p>

        {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="ipAddress"
            placeholder="IP Address"
            required
            value={formData.ipAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update IP"
              : "Add IP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IPModal;
