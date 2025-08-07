import { EmailSuccess, EmailVerified } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Verified = () => {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
          <Image className="w-48 " src={EmailVerified} alt="Verify Email" />

          <h2 className="text-2xl font-bold mb-1">Verified</h2>
          <p className="text-sm text-gray-500 mb-6">
            Verification successful. You have successfully verified your email.
          </p>

          <Link
            href="/auth/login"
            className="w-full block bg-gray-600 text-white text-center text-sm py-2 px-4 rounded hover:bg-gray-700 transition disabled:opacity-50"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verified;
