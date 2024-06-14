import NavBar from "@c/Common/Navbar";
import { AuthProvider } from "@u/context/Auth";
import { CartProvider } from "@u/context/Cart";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavBar />
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

export default Provider;
