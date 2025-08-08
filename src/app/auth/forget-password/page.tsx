"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { ForgotPasswordRequest } from "@/models/request/auth-request";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import { AuthService } from "@/services/auth-service";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<ForgotPasswordRequest>({
    email: "",
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

    setIsLoading(true);
    const response = await AuthService.forgotPassword(formData);

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.message) {
      toast.success(response.data.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-1">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition disabled:opacity-50"
          >
            {isLoading ? <Loader /> : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center space-y-2">
          <div>
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
