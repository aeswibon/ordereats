import NavBar from "@c/Common/Navbar";
import { Container } from "@mui/material";
import { AuthProvider } from "@u/context/Auth";
import { CartProvider } from "@u/context/Cart";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavBar />
        <Container>{children}</Container>
      </CartProvider>
    </AuthProvider>
  );
};

export default Provider;
