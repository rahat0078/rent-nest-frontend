"use client";

import { LoginForm } from "@/components/login-form";
import { TLoginUser } from "@/types/auth.types";

export default function SignInFormWrapper() {
  const handleSignup = async (data: TLoginUser) => {
    console.log(data);
  };

  return <LoginForm onSubmit={handleSignup} />;
}
