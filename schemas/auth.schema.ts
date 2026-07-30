import z from "zod";

const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (val) => passwordRegex.uppercase.test(val),
        "Password must contain at least one uppercase letter",
      )
      .refine(
        (val) => passwordRegex.lowercase.test(val),
        "Password must contain at least one lowercase letter",
      )
      .refine(
        (val) => passwordRegex.number.test(val),
        "Password must contain at least one number",
      )
      .refine(
        (val) => passwordRegex.special.test(val),
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["TENANT", "LANDLORD"], {
      error: "Please select a role",
    }),
    phone: z
      .string()
      .trim()
      .min(10, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^[+]?[0-9]+$/, "Invalid phone number")
      .optional(),
    profilePhoto: z
      .string()
      .optional()
      .refine(
        (val) => !val || z.string().url().safeParse(val).success,
        "Profile photo must be a valid URL",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
