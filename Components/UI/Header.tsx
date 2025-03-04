"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAuth } from "@/Hooks";
import { toast } from "sonner";
const Header: React.FC = () => {
  const { user, logout, isLoading} = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    toast.promise(logout, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to log out",
    });
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-line sticky top-0 backdrop-blur-sm z-50">
      <Link href="/">
        <div className="text-xl font-bold font-sora">ImgGen</div>
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
        <Link
              href="/uploads"
              className="text-main font-medium md:px-4 px-1 py-2 flex items-center"
            >
              Uploads
            </Link>
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className=" px-4 h-9 bg-primary font-sora text-sm font-medium text-primary-inverse rounded-md flex items-center"
            >
              Logout
            </button>
            
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-main font-medium md:px-4 px-1 py-2 flex items-center"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-primary font-sora text-sm font-medium text-primary-inverse rounded-md px-4 h-9 flex items-center"
            >
              Sign Up
            </Link>
          </>
        )}

        <button
          onClick={toggleTheme}
          className="h-10 w-10 flex items-center justify-center text-sub border-line border rounded-md p-1"
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-500" size={20} />
          ) : (
            <Moon className="text-gray-800" size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
