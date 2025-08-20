"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthService } from "@/services/auth-service";
import { EmailVerified } from "@/assets";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

const VerifiedEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Missing verification token.");
        setIsLoading(false);
        return;
      }

      try {
        await AuthService.verifyEmail(token);
        setIsVerified(true);
      } catch (error: any) {
        toast.error(error.message || "Verification failed");
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 text-center">
        {isVerified ? (
          <>
            <Image
              className="w-28 mx-auto"
              src={EmailVerified}
              alt="Verify Email"
            />
            <h2 className="text-2xl font-bold mb-1">Email Verified</h2>
            <p className="text-sm text-gray-500 mb-6">
              Verification successful. You can now log in.
            </p>
            <Link
              href="/auth/login"
              className="w-full block bg-gray-800 text-white text-center text-sm py-2 px-4 rounded hover:bg-gray-900 transition"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-1 text-red-600">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              The verification link is invalid or has expired.
            </p>
            <Link
              href="/auth/resend-verification"
              className="w-full block bg-gray-800 text-white text-center text-sm py-2 px-4 rounded hover:bg-gray-900 transition"
            >
              Resend Verification Email
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifiedEmail;
