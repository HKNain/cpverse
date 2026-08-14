"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!loginInput || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginInput,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // JWT is stored in the HTTP-only cookie
      // by the backend.
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4 text-[#b5b5b5]">
      <div className="w-full max-w-sm">
        {/* Logo / title */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-[#eeeeee]"
          >
            CP Verse
          </Link>

          <p className="mt-2 text-sm text-[#666]">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-[#242424] bg-[#111111] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login input */}
            <div>
              <label
                htmlFor="loginInput"
                className="mb-2 block text-sm text-[#aaa]"
              >
                Email or Username
              </label>

              <input
                id="loginInput"
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="Enter email or username"
                autoComplete="username"
                className="w-full rounded-md border border-[#292929] bg-[#0c0c0c] px-3 py-2.5 text-sm text-[#ddd] outline-none transition placeholder:text-[#4f4f4f] focus:border-[#454545]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-[#aaa]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-[#292929] bg-[#0c0c0c] px-3 py-2.5 pr-10 text-sm text-[#ddd] outline-none transition placeholder:text-[#4f4f4f] focus:border-[#454545]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] transition hover:text-[#aaa]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-md border border-[#3a2525] bg-[#171010] px-3 py-2.5 text-sm text-[#c99b9b]">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-[#666]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#aaa] underline underline-offset-4 transition hover:text-[#eee]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
