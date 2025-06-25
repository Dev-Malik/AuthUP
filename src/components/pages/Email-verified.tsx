"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const EmailVerified = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Check if user is authenticated (verification successful)
        const session = await authClient.getSession();
        
        if (session.data?.user) {
          // User is authenticated, verification was successful
          setStatus("success");
          setMessage("Your email has been successfully verified!");
          toast.success("Email verified successfully!");
          
          // Auto-redirect after 3 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          // Check URL parameters to understand the status
          const error = searchParams.get("error");
          const success = searchParams.get("success");
          
          if (error) {
            setStatus("error");
            setMessage("Email verification failed. The link may be expired or invalid.");
            toast.error("Email verification failed");
          } else if (success === "true") {
            setStatus("success");
            setMessage("Your email has been successfully verified!");
            toast.success("Email verified successfully!");
            
            // Auto-redirect after 3 seconds to login
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            // Default success state if redirected here
            setStatus("success");
            setMessage("Your email address has been successfully verified!");
            
            // Auto-redirect after 2 seconds
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred during email verification");
        toast.error("Verification failed");
      }
    };

    handleVerification();
  }, [searchParams, router]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-100">
              Verifying Email...
            </h1>
            <p className="text-gray-300">
              Please wait while we verify your email address.
            </p>
          </>
        );
      
      case "success":
        return (
          <>
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-100">
              Email Verified!
            </h1>
            <p className="text-gray-300">
              {message}
            </p>
            <p className="text-sm text-gray-400">
              Redirecting you automatically...
            </p>
            <Link href="/login" className="w-full block">
              <Button className="w-full" size="lg">
                Go to Login
              </Button>
            </Link>
          </>
        );
      
      case "error":
        return (
          <>
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-red-400">
              Verification Failed
            </h1>
            <p className="text-gray-300">
              {message}
            </p>
            <div className="space-y-2 w-full">
              <Link href="/login" className="w-full block">
                <Button className="w-full" size="lg">
                  Go to Login
                </Button>
              </Link>
              <Link href="/signup" className="w-full block">
                <Button variant="outline" className="w-full" size="lg">
                  Sign Up Again
                </Button>
              </Link>
            </div>
          </>
        );
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

      <div className="w-full max-w-md p-8 space-y-6 text-center bg-[#1E0A29] backdrop-blur-sm rounded-lg shadow-lg border-none">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmailVerified;