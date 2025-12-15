import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignUp signInUrl="/sign-in"/>
    </div>
  );
}