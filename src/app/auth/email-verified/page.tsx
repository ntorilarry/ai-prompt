"use client";

import { Suspense } from "react";
import VerifiedEmail from "./components/verifiedEmail";
import Loader from "@/components/loader";

export default function EmailVerifiedPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <VerifiedEmail />
    </Suspense>
  );
}
