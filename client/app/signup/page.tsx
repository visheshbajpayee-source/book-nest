"use client";

import Link from "next/link";
import React, { useState, ChangeEvent} from "react";

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignupPage() {

    const [form, setForm] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit= (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log(form);

        alert("Signup Form");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-sm border border-gray-200">

                <h1 className="text-4xl font-bold text-[#4E2F28] text-center mb-2">
                    BookNest
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Create your BookNest account
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#4E2F28]"
                            required
                        />
                    </div>

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
                            placeholder="Create password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#4E2F28]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#4E2F28]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4E2F28] text-white py-3 rounded-xl hover:opacity-90 transition"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="text-[#4E2F28] font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </div>
        </div>
    );
}