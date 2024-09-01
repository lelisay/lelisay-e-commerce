"use client";

import React from 'react';
import { AuthProvider } from '../AuthProvider.js';
import Navigation from "../nav/Navigation";

const SellerLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-seller-background text-seller-text">
        
        <Navigation />
         seller
        <div className="seller-content">{children}</div>
      </body>
    </html>
  );
};

export default SellerLayout;
