"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ResetPasswordRequest } from "@/models/request/auth-request";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth-service";

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<ResetPasswordRequest>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const response = await AuthService.resetPassword(formData);

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.message) {
      toast.success(response.data.message);
      router.push("/auth/login");
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
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showNewPassword ? (
              <FiEyeOff
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            ) : (
              <FiEye
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showConfirmPassword ? (
              <FiEyeOff
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FiEye
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
