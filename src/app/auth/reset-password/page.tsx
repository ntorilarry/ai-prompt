"use client";

import { useEffect, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/services/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "@/components/loader";

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oobCode, setOobCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      toast.error("Invalid or missing reset code.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password reset successful!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-1">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          Reset your password to regain access to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showNewPassword ? (
              <FiEyeOff
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg cursor-pointer"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <FiEye
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg cursor-pointer"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition disabled:opacity-50"
          >
            {isLoading ? <Loader /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
