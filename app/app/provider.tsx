"use client";

import NavBar from "@c/Common/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@u/context/Auth";
import { CartProvider } from "@u/context/Cart";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          {children}
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Provider;
