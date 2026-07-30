"use client";

import SignupForm from "@/components/signup-form";
import { registerUser } from "@/app/(auth)/_authActions/registerUser";
import { TRegisterUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupFormWrapper() {
  const router = useRouter();
  const handleSignup = async (data: TRegisterUser) => {
    try {
      const result = await registerUser(data);
      toast.success(result.message);
      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  };

  return <SignupForm onSubmit={handleSignup} />;
}
