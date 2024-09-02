"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import AdminLayout from './(components)/layout/AdminLayout';
import SellerLayout from './(components)/layout/SellerLayout';
import DefaultLayout from './(components)/layout/DefaultLayout';
import AuthProvider from './(components)/AuthProvider';
import { SidebarProvider } from './context/SidebarContext'; // Import SidebarProvider
import './globals.css'

const RootLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log("Session status:", status); // Debugging line
      if (session?.user?.email) {
        try {
          console.log("Fetching user role for:", session.user.email); // Debugging line

          if (session?.user?.role === "admin") {
            setUserRole("admin");
          } else {
            const response = await fetch('/api/Users/getUserRole', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: session.user.email }),
            });

            if (!response.ok) {
              throw new Error('Failed to fetch role');
            }

            const roleData = await response.json();
            console.log("Fetched role data:", roleData); // Debugging line
            setUserRole(roleData.role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole("default"); // Fallback to default if there's an error
        } finally {
          setLoadingRole(false);
        }
      } else {
        setLoadingRole(false); // No email found, assume default role
      }
    };

    fetchUserRole();
  }, [session?.user?.email]);

  if (status === 'loading' || loadingRole) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <DefaultLayout>{children}</DefaultLayout>; // Render DefaultLayout if not logged in
  }

  switch (userRole) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'seller':
      return <SellerLayout>{children}</SellerLayout>;
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
};

export default function RootLayoutWrapper({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 dark:text-secondary-foreground font-suse">
        <AuthProvider>
          <SidebarProvider> {/* Wrap the entire app with SidebarProvider */}
            <RootLayout>{children}</RootLayout>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
