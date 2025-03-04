"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/Hooks";
import { useRouter } from "next/navigation";
export interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
    const {signup, isLoading} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: SignupFormData) => {
    signup(data);
  };

   const router = useRouter();

  const goBack = () => {
    router.back();
  }

  return (
    <div className="md:w-[480px] w-full mx-auto space-y-4 my-10">
    <button onClick={goBack} className="h-10 w-10 center rounded-lg bg-secondary">
      <ChevronLeft size={20}/>
    </button>
      <div className="">
        <h1 className="text-2xl font-bold font-sora text-transparent bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text">
          Create an Account
        </h1>
        <p className="text-sub text-sm">
          Sign up to save your images and generate urls
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex-col flex gap-4 ">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Username"
            className="input"
            autoComplete="off"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            })}
          />
          {errors.username?.message && (
            <p className="text-red-500 text-xs pl-2">{errors.username?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="input"
            autoComplete="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs pl-2">{errors.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          <div className="flex justify-between text-sm font-semibold">
            {errors.password?.message ? (
              <p className="text-red-500 text-xs pl-2">{errors.password?.message}</p>
            ) : (
              <div/>
            )}
            <div onClick={togglePassword} className="cursor-pointer flex text-main items-center gap-2">
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              <span>{showPassword ? "Hide Password" : "Show Password"}</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-sm text-primary-inverse w-full h-10 center font-sora font-semibold rounded-md"
        >
            {isLoading && <Loader size={20} className="animate-spin"/>}
            {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sub text-sm text-center">
        Already have an account?{" "} &nbsp;
        <Link href="/login" className="text-main font-medium font-sora">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
