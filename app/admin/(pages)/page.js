"use client";
import {
  AdminProfilePage,
  CustomConfirm,
  FullScreenLoader,
  IPModal,
  PasswordUpdateModal,
} from "@/components";
import { axios } from "@/utils";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaUserCircle,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";

export default function SettingsMainSection() {
  const [remoteAccess, setRemoteAccess] = useState(true);
  const [data, setData] = useState({});
  const [allowedIps, setAllowedIps] = useState([]);
  const [editIP, setEditIP] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showAddIPModal, setShowAddIPModal] = useState(false);

  const handleDeleteIPAddress = (ipID) => {
    CustomConfirm({
      isOpen: true,
      onConfirm: async () => {
        setLoading(true);

        try {
          const res = await axios.delete(
            `/api/admin/settings/allowed-ips/${ipID}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.data;

          if (!data?.success)
            throw new Error(data.message || "Failed to delete ip address");

          setAllowedIps((prev) => prev.filter((ip) => ip.id !== ipID));

          toast.success("IP address deleted successfully.");
        } catch (err) {
          toast.error(
            err.message || err.error || "Failed to delete IP address"
          );
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {},
      message: "Are you sure to delete this IP address?",
      theme: "red",
    });
  };

  const handleToggleRemoteAccess = async () => {
    CustomConfirm({
      isOpen: true,
      onConfirm: async () => {
        setLoading(true);

        try {
          setLoading(true);
          const res = await axios.put("/api/admin/settings");
          const data = await res.data;

          if (!data.success) {
            throw new Error(data.message || "Failed to update setting");
          }

          setRemoteAccess(data.setting.remoteAccess);
          toast.success("Remote access setting updated.");
        } catch (error) {
          toast.error(error.message || "Failed to toggle remote access.");
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {},
      message: "Are you sure to update remote access?",
      theme: "green",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/admin/settings`);
        const data = await res.data;

        if (!data.success)
          return toast.error(
            data.message || data.error || "Failed to load setting"
          );

        setAllowedIps(data.Library.AllowedIP || []);
        setRemoteAccess(data.Library?.Setting?.remoteAccess || false);
        setData({
          ...data.Library,
          remoteAccess: data.Library?.Setting?.remoteAccess,
          Setting: undefined,
          AllowedIP: undefined,
          systemIP: data.systemIP,
        });
      } catch (error) {
        toast.error(error.message || error.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <section className="p-6 sm:p-8 md:p-10 w-full mx-auto bg-white">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800  mb-6">
        System Settings
      </h2>

      {/* System IP Display */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-600 ">
          System IP Address
        </h4>
        <p className="mt-1 text-xl font-semibold text-blue-600 ">
          {data?.systemIP || "Not Available"}
        </p>
      </div>

      {/* Public Access Toggle */}
      <div className=" flex items-center justify-between p-4 bg-gray-50  rounded-lg border border-gray-200 ">
        <span className="text-gray-800  text-lg font-medium">
          Allow Remote Access
        </span>
        <button
          onClick={handleToggleRemoteAccess}
          className="text-3xl text-blue-600  focus:outline-none"
        >
          {remoteAccess ? <FaToggleOn /> : <FaToggleOff />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm my-3">
        {/* Title & Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Allowed IP Addresses
          </h2>
          <p className="text-sm text-gray-500">
            Manage the list of IP addresses that are allowed to access the
            system.
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddIPModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          <PlusCircleIcon size={18} />
          Add New
        </button>
      </div>

      {/* Allowed IPs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300  rounded-lg">
          <thead className="bg-gray-100 text-gray-700  text-left">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300">#</th>
              <th className="px-4 py-3 border-b border-gray-300">IP Address</th>
              <th className="px-4 py-3 border-b border-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allowedIps.length > 0 ? (
              allowedIps.map((ip, index) => (
                <tr
                  key={ip.id}
                  className="border-b border-gray-200  hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-800 ">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 ">
                    {ip.ipAddress}
                  </td>
                  <td className="px-4 py-3 text-sm text-right space-x-3">
                    <button
                      onClick={() => setEditIP(ip)}
                      className="text-blue-500 hover:text-blue-700 "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteIPAddress(ip.id)}
                      className="text-red-500 hover:text-red-700 "
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-500 "
                >
                  No allowed IPs configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <FaShieldAlt className="text-blue-600 text-2xl mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Security Settings
            </h2>
            <p className="text-sm text-gray-500">
              Keep your account secure by updating your password regularly.
            </p>
          </div>
        </div>

        {/* Update Button */}
        <div className="text-right mt-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow inline-flex items-center"
          >
            <FaLock className="mr-2" /> Update Password
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordUpdateModal onClose={() => setShowPasswordModal(false)} />
      )}

      {showAddIPModal && (
        <IPModal
          mode="add"
          onClose={() => {
            setShowAddIPModal(false);
          }}
          onSuccess={(newIP) => {
            setAllowedIps((prevIPs) => [...prevIPs, newIP]);
          }}
        />
      )}
      {editIP && (
        <IPModal
          mode="edit"
          ip={editIP}
          onClose={() => {
            setEditIP(null);
          }}
          onSuccess={(newIP) => {
            setAllowedIps((prevIPs) =>
              prevIPs.map((ip) => (ip.id === newIP.id ? newIP : ip))
            );
          }}
        />
      )}
    </section>
  );
}
