import { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Menu as HamburgerIcon,
  Sun,
  Moon,
  User,
  Settings,
  Database,
  Shield,
  LogOut,
} from "lucide-react";
import LogoutConfirmationModal from "../LogoutConfirmationModal"; // Adjust the import path as needed

export default function SellerNavigation() {
  const { isOpen, setIsOpen } = useSidebar(); // Access and set sidebar state
  const [theme, setTheme] = useState("light");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the modal visibility
  const { data: session } = useSession(); // Get session data

  // Theme loading from local storage and system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Theme toggle function
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
    signOut({ callbackUrl: "/" }); // Perform the logout
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Hide the confirmation modal
  };

  return (
    <div className="">
      <div
        className={`fixed h-full bg-gray-200 dark:bg-gray-800 ${
          isOpen ? "w-64" : "w-20"
        } transition-width duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <HamburgerIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
          <button
            onClick={toggleTheme}
            className="text-gray-900 dark:text-white"
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="mt-5">
          <div className="flex flex-col  items-start min-h-vh">
            <div className="" >
              {/* User Management Section */}
              <div className="mb-4">
                <h2
                  className={`text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 px-4 ${
                    isOpen ? "" : "hidden"
                  }`}
                >
                  User Management
                </h2>
                <Link
                  href="/Users"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <User className="mr-3 h-6 w-6" />
                  {isOpen && <span>Users</span>}
                </Link>
                <Link
                  href="/CreateUser"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Shield className="mr-3 h-6 w-6" />
                  {isOpen && <span>Security & Access</span>}
                </Link>
              </div>

              {/* System Management Section */}
              <div className="mb-4">
                <h2
                  className={`text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 px-4 ${
                    isOpen ? "" : "hidden"
                  }`}
                >
                  System Management
                </h2>
                <Link
                  href="/database"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Database className="mr-3 h-6 w-6" />
                  {isOpen && <span>Database</span>}
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Settings className="mr-3 h-6 w-6" />
                  {isOpen && <span>Settings</span>}
                </Link>
              </div>
            </div>

            <div>
              {/* Logout Section */}
              {session && (
                <div className="mt-auto">
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
                  >
                    <LogOut className="mr-3 h-6 w-6" />
                    {isOpen && <span>Logout</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Logout confirmation modal */}
      <LogoutConfirmationModal
        show={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
}
