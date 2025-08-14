"use client";

import { useEffect } from "react";
import { applyActionCode } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { EmailVerified } from "@/assets";
import { auth } from "@/services/firebase";

const Verified = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oobCode = params.get("oobCode");

    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          toast.success("Email verified successfully!");
        })
        .catch(() => {
          toast.error("Invalid or expired verification link.");
        });
    } else {
      toast.error("Verification code not found.");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 text-center">
        <Image className="w-28 mx-auto" src={EmailVerified} alt="Verify Email" />
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
      </div>
    </div>
  );
};

export default Verified;
