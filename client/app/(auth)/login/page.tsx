'use client';
import Link from "next/link";
import React ,{useState,ChangeEvent } from "react";

export default function LoginPage(){
     const[form,setForm]=useState({
        email:"",
        password:""
     });

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
    });
    }

    const handleSubmit=(e:React.SyntheticEvent<HTMLFormElement>)=>{
       e.preventDefault();
       console.log(form);
       alert("Login Form");
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-[#4E2F28] text-center mb-2">
          BookNest
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back to your reading journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#4E2F28]"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#4E2F28]"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="accent-[#4E2F28] w-4 h-4"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm text-[#4E2F28] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4E2F28] text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#4E2F28] font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
