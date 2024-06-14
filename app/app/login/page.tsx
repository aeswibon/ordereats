"use client";

import { Button, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "@u/context/Auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data from login form", data);
    await login(data.username, data.password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          {...register("username")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
