"use client";
import React, { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { InputField } from "@/components/Auth/FormFields";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/schema/forgotPassword";
import { authClient } from "@/lib/auth-client";

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [pending, setPending] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setPending(true);
    try {
      const { error } = await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(
          "If an account exists with this email, you will receive a password reset link"
        );
        // Clear the form after successful submission
        form.reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Forgot password error:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-10">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 rounded-md bg-green-500 flex items-center justify-center text-white font-bold">
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">AuthUp</h1>
          </div>
        </Link>
      </div>

      <Card className="w-full max-w-md border-none shadow-lg bg-[#1E0A29] backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center text-gray-100">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                type="email"
                icon={<Mail className="h-5 w-5 text-muted-foreground" />}
              />

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending email...
                  </>
                ) : (
                  <>
                    Send Reset Link <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-700 underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;