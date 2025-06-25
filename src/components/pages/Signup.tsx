"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "@/lib/schema/signupSchema";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputField } from "../Auth/FormFields";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { Button } from "../ui/button";
import { GoogleAuthButton } from "../Auth/googlebutton";

const Signup = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [pending, setPending] = useState(false);
  const onSubmit = async (data: SignUpFormValues) => {
    form.reset();
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          toast("Signup Successful", {
            description: "Please check your email to verify your account.",
          });
          console.log("success");
        },
        onError: (err) => {
          console.log("error", err);
          toast("Something went wrong", {
            description: err.error.message ?? "An unexpected error occurred.",
          });
          console.log("error", err.error.message);
        },
      }
    );
    setPending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2C003E] to-[#4B0082] p-4">
      
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
            <h1 className="text-3xl font-bold text-white">AuthUP</h1>
          </div>
        </Link>
      </div>

      
      <Card className="w-full max-w-md border-none shadow-lg bg-[#1E0A29] backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-white">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between text-white">
                      <FormLabel>Full name</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            ℹ️
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-gray-800 p-2 rounded shadow">
                          Enter all the credentials carefully
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <input
                          className="w-full bg-transparent focus:outline-none text-white"
                          placeholder="Your name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {/* <InputField
                control={form.control}
                name="name"
                label="Full name"
                placeholder="Your name"
                type="text"
                icon={<User className="h-5 w-5 text-muted-foreground" />}
              />  */}
              
              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="abcd@gmail.com"
                type="email"
                icon={<Mail className="h-5 w-5 text-muted-foreground" />}
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                showPasswordToggle={true}
              />
              <InputField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                type="password"
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                showPasswordToggle={true}
              />
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign up <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1E0A29] px-2 text-white">
                or continue with
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <GoogleAuthButton
              action="signup"
              buttonText="Sign up with google"
              redirectTo="/dashboard"
            />
          </div>
          <div className="text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-700 underline-offset-4 hover:underline"
            >
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
