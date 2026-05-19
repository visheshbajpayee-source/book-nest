"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(form);

        alert("Login Successful");

        router.push("/");
    };

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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#4E2F28]"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4E2F28]"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
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
                    Don’t have an account?{" "}
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