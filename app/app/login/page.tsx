"use client";

import { Button } from "@c/ui/button";
import { Input } from "@c/ui/input";
import { Label } from "@c/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@u/context/Auth";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: { username: string; password: string }) =>
      login(credentials.username, credentials.password),
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    loginMutation.mutate({ username: data.username, password: data.password });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center h-screen">
      <div className="hidden lg:block" />
      <div className="mx-auto max-w-[400px] space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your username and password to access
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>
            <Button className="w-full">Login</Button>
            <Link
              href="/register"
              className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
