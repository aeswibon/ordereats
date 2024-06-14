"use client";

import { Button } from "@c/ui/button";
import { Input } from "@c/ui/input";
import { Label } from "@c/ui/label";
import { useAuth } from "@u/context/Auth";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await registerUser(data.email, data.username, data.password);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center h-screen">
      <div className="hidden lg:block" />
      <div className="mx-auto max-w-[400px] space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email, username and password to create an account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="jane"
                required
                {...register("username")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Password</Label>
              <Input
                id="new-password"
                type="password"
                required
                {...register("password")}
              />
            </div>
            <Button className="w-full">Register</Button>
            <Link
              href="/register"
              className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
