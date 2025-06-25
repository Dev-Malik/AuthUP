"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ use sonner's toast
import { authClient } from "@/lib/auth-client";

const Dashboard = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully"); // ✅ sonner toast
      router.push("/login");
    } catch (error) {
      toast.error("There was a problem signing out."); // ✅ sonner toast
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          {isSigningOut ? (
            <>
              <LogOut className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </>
          )}
        </Button>
      </div>
      <div>Welcome to your dashboard</div>
    </div>
  );
};

export default Dashboard;
