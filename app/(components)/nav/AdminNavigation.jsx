import { useState, useEffect } from "react";
import { useSidebar } from '../../context/SidebarContext'
import Link from "next/link";
import { Menu as HamburgerIcon, Sun, Moon, User, Settings, Database, Shield } from "lucide-react";

export default function AdminNavigation() {
  const { isOpen, setIsOpen } = useSidebar(); // Access and set sidebar state
  const [theme, setTheme] = useState("light");

  // Theme loading from local storage and system preference
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

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <div className={`fixed h-full bg-gray-100 dark:bg-gray-800 ${isOpen ? "w-64" : "w-20"} transition-width duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <HamburgerIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
          <button onClick={toggleTheme} className="text-gray-900 dark:text-white">
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
        <nav className="mt-5">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <User className="mr-3 h-6 w-6" />
            {isOpen && <span>User Management</span>}
          </Link>
          <Link href="/security" className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <Shield className="mr-3 h-6 w-6" />
            {isOpen && <span>Security & Access</span>}
          </Link>
          <Link href="/database" className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <Database className="mr-3 h-6 w-6" />
            {isOpen && <span>Database</span>}
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings className="mr-3 h-6 w-6" />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
}
