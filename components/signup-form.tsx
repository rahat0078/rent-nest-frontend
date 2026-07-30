"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRegisterUser } from "@/types/auth.types";
import { signupSchema } from "@/schemas/auth.schema";
import { FieldDescription } from "./ui/field";
import Link from "next/link";

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps extends Omit<
  React.ComponentProps<"div">,
  "onSubmit"
> {
  onSubmit: (data: TRegisterUser) => Promise<void> | void;
}

export function SignupForm({ className, onSubmit, ...props }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "TENANT",
      phone: "",
      profilePhoto: "",
    },
  });

  const handleFormSubmit = async (values: SignupFormValues) => {
    const { confirmPassword, ...registerData } = values;
    await onSubmit(registerData as TRegisterUser);
    reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-6 md:p-8 space-y-4"
            >
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold text-primary">
                  Create your account
                </h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your details below to create your RentNest account
                </p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.name.message}
                  </p>
                )}
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

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I am registering as</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TENANT">Tenant</SelectItem>
                        <SelectItem value="LANDLORD">Landlord</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Phone Field (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Profile Photo URL Field (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="profilePhoto">
                  Profile Photo URL (Optional)
                </Label>
                <Input
                  id="profilePhoto"
                  placeholder="https://example.com/avatar.jpg"
                  {...register("profilePhoto")}
                />
                {errors.profilePhoto && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.profilePhoto.message}
                  </p>
                )}
              </div>

              {/* Password and Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            <FieldDescription className="text-center pb-2">
              Don&apos;t have an account? <Link href={"/signin"}>Sign In</Link>
            </FieldDescription>
          </div>

          {/* Right Side Image Banner */}
          <div className="relative hidden bg-muted md:block">
            <Image
              unoptimized
              height={600}
              width={600}
              src="/singUpImg.jpg"
              alt="RentNest Signup"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupForm;
