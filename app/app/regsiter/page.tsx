"use client";

import { Button, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "@u/context/Auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await registerUser(data.username, data.password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
