"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import AdminLayout from './(components)/layout/AdminLayout';
import SellerLayout from './(components)/layout/SellerLayout';
import DefaultLayout from './(components)/layout/DefaultLayout';
import AuthProvider from './(components)/AuthProvider';
import { SidebarProvider } from './context/SidebarContext'; // Import SidebarProvider
import './globals.css'

const RootLayout = ({ children }) => {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Fallback to default layout if no session
  if (!session) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  // Get the user role from session and switch layouts accordingly
  const userRole = session?.user?.role || 'guest'; 

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
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AuthProvider>
          <SidebarProvider> {/* Wrap the entire app with SidebarProvider */}
            <RootLayout>{children}</RootLayout>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
