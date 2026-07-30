"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { signInSchema } from "@/schemas/auth.schema";
import { TLoginUser } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

type LoginFormValues = z.infer<typeof signInSchema>;

interface LoginFormProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit: (data: TLoginUser) => Promise<void> | void;
}

export function LoginForm({ className, onSubmit, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (values: LoginFormValues) => {
    await onSubmit(values as TLoginUser);
    reset()
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="p-6 md:p-8 space-y-4"
          >
            <div className="flex flex-col items-center gap-2 text-center mb-4">
              <h1 className="text-2xl font-bold text-primary">Welcome back!</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Sign in to your RentNest account
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-xs text-destructive font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Redirect link */}
            <p className="text-center text-sm text-muted-foreground pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>

          {/* Right Side Image Banner */}
          <div className="relative hidden bg-muted md:block">
            <Image
              unoptimized
              height={600}
              width={600}
              src="/singUpImg.jpg"
              alt="RentNest Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
