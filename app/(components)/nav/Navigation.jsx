"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useSession,signOut } from "next-auth/react";  // Import useSession
import LogoutConfirmationModal from "../LogoutConfirmationModal"

export default function Navigation() {
  const { data: session } = useSession();  // Get session data
  const [theme, setTheme] = useState("light");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the modal visibility


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    signOut({ callbackUrl: '/' }); // Perform the logout
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Hide the confirmation modal
  };


  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          EYY-LOGO
        </div>
        <div className="flex items-center gap-10">
          <Link href="/usersview/new" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            New
          </Link>
          <Link href="/Users/CreateUser" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Create User
          </Link>
          <Link href="/ClientMember" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Client Membership
          </Link>
          <Link href="/Member" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Member
          </Link>
          <Link href="/Public" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Public
          </Link>
          {session ? (
            <>
              <button
                onClick={handleLogoutClick}
                className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
              <LogoutConfirmationModal
                show={showLogoutModal}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
              />
            </>
          ) : (
            <Link href="/auth/signIn" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
          )}
          
        </div>
        <div>
        <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full">
            {theme === "dark" ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>

      </nav>
    </header>
  );
}
