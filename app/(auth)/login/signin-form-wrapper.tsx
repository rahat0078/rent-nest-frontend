"use client";

import { LoginForm } from "@/components/login-form";
import { loginUser } from "@/app/(auth)/_authActions/loginUser";
import { TLoginUser } from "@/types/auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SignInFormWrapper() {
  const searchParams = useSearchParams();
  const search = searchParams.get("redirectTo");
  const isRedirectTo = search ? search : "";

  const router = useRouter();
  const handleLogin = async (data: TLoginUser) => {
    try {
      const result = await loginUser(data, isRedirectTo);
      toast.success(result.message);
      router.push(result.destination);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login Failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
