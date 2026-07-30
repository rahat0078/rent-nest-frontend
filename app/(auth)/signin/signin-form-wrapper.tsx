"use client";

import { LoginForm } from "@/components/login-form";
import { loginUser } from "@/services/authService/loginUser";
import { TLoginUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInFormWrapper() {
  const router = useRouter();
  const handleLogin = async (data: TLoginUser) => {
    try {
      const result = await loginUser(data);
      toast.success(result.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login Failed",
      );
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
