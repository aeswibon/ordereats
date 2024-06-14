"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "@u/context/Auth";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Restaurant
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/cart" passHref>
          <Button color="inherit">Cart</Button>
        </Link>
        {isAuthenticated ? (
          <>
            <Typography variant="h6">{user}</Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
