import { z } from "zod";
import normalizeEmail from "validator/lib/normalizeEmail";

export const RegisterSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(5, "Username must be at least 5 chars long")
      .trim(),
    email: z
      .string()
      .email("Email is not a valid email")
      .transform(email => normalizeEmail(email)),
    password: z
      .string()
      .min(6, "Password must be at least 6 chars long")
      .trim(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Email is not a valid email")
      .transform(email => normalizeEmail(email)),
    password: z.string().min(1, "Password is required").trim(),
  }),
});

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Email is not a valid email")
      .transform(email => normalizeEmail(email)),
  }),
});

export const ResetPasswordSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, "Password must be at least 6 chars long")
      .trim(),
  }),
});
