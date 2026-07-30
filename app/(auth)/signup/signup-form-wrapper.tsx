"use client";

import SignupForm from "@/components/signup-form";
import { TRegisterUser } from "@/types/auth.types";

export default function SignupFormWrapper() {
  const handleSignup = async (data: TRegisterUser) => {
    console.log("Form Data:", data);
  };

  return <SignupForm onSubmit={handleSignup} />;
}
