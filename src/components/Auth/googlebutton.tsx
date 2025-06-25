// components/auth/GoogleAuthButton.tsx
"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import {toast} from "sonner"
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/ui/google-icon";

interface GoogleAuthButtonProps {
  action: "login" | "signup";
  redirectTo?: string;
  buttonText?: string;
}

export const GoogleAuthButton = ({
  action = "login",
  redirectTo = "/dashboard",
  buttonText = "Continue with Google",
}: GoogleAuthButtonProps) => {
  
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
  
      if (action === "login") {
        toast.success("Logged in successfully", {
          description: "You have been logged in successfully.",
        });
      } else {
        toast.success("Signed up successfully", {
          description: "Your account has been created successfully.",
        });
      }
    } catch (error) {
      if (action === "login") {
        toast.error("Error logging in", {
          description: "Could not log in with Google. Please try again.",
        });
      } else {
        toast.error("Error signing up", {
          description: "Could not sign up with Google. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <GoogleIcon className="w-4 h-4" />
          <span>{buttonText}</span>
        </>
      )}
    </Button>
  );
};