"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SignInRequest } from "@/models/request/auth-request";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthService } from "@/services/auth-service";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<SignInRequest>({
    email: "",
    password: "",
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
    const response = await AuthService.login(formData);

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.user && response.data?.token) {
      login(response.data.user, response.data.token);
      router.push("/chat-prompt");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-1">Sign In</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access your account
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

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showPassword ? (
              <FiEyeOff
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FiEye
                className="absolute end-2.5 bottom-[0.95rem] text-gray-600 text-lg"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition disabled:opacity-50"
          >
            {isLoading ? <Loader /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center space-y-2">
          <Link
            href="/auth/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot your password?
          </Link>
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
