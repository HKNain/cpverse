"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superkey, setSuperkey] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showSuperkey, setShowSuperkey] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!username || !email || !password || !superkey) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          superkey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account");
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#b5b5b5]">

      <div className="flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8 text-center">

            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight text-[#f0f0f0]"
            >
              CP Verse
            </Link>

            <h1 className="mt-6 text-xl font-medium text-[#e5e5e5]">
              Create an account
            </h1>

            <p className="mt-2 text-sm text-[#666]">
              Create an admin account to manage solutions
            </p>

          </div>

          {/* Signup Card */}
          <div className="rounded-xl border border-[#242424] bg-[#111111] p-6 shadow-2xl sm:p-7">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Username */}
              <div className="space-y-2">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#bdbdbd]"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#292929]
                    bg-[#0c0c0c]
                    px-3.5
                    py-3
                    text-sm
                    text-[#e5e5e5]
                    outline-none
                    transition
                    placeholder:text-[#4f4f4f]
                    hover:border-[#333]
                    focus:border-[#505050]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* Email */}
              <div className="space-y-2">

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#bdbdbd]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#292929]
                    bg-[#0c0c0c]
                    px-3.5
                    py-3
                    text-sm
                    text-[#e5e5e5]
                    outline-none
                    transition
                    placeholder:text-[#4f4f4f]
                    hover:border-[#333]
                    focus:border-[#505050]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* Password */}
              <div className="space-y-2">

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#bdbdbd]"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#292929]
                      bg-[#0c0c0c]
                      px-3.5
                      py-3
                      pr-11
                      text-sm
                      text-[#e5e5e5]
                      outline-none
                      transition
                      placeholder:text-[#4f4f4f]
                      hover:border-[#333]
                      focus:border-[#505050]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#555]
                      transition
                      hover:text-[#aaa]
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Admin Key */}
              <div className="space-y-2">

                <label
                  htmlFor="superkey"
                  className="block text-sm font-medium text-[#bdbdbd]"
                >
                  Admin Key
                </label>

                <div className="relative">

                  <input
                    id="superkey"
                    type={showSuperkey ? "text" : "password"}
                    value={superkey}
                    onChange={(e) => setSuperkey(e.target.value)}
                    placeholder="Enter admin key"
                    autoComplete="off"
                    disabled={loading}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#292929]
                      bg-[#0c0c0c]
                      px-3.5
                      py-3
                      pr-11
                      text-sm
                      text-[#e5e5e5]
                      outline-none
                      transition
                      placeholder:text-[#4f4f4f]
                      hover:border-[#333]
                      focus:border-[#505050]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowSuperkey((value) => !value)
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#555]
                      transition
                      hover:text-[#aaa]
                    "
                    aria-label={
                      showSuperkey
                        ? "Hide admin key"
                        : "Show admin key"
                    }
                  >
                    {showSuperkey ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                <p className="text-xs leading-relaxed text-[#555]">
                  An admin key is required to create an account.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-[#3a2525] bg-[#171010] px-3.5 py-3 text-sm text-[#d29b9b]">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#e5e5e5]
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[#0b0b0b]
                  transition
                  hover:bg-white
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>

            </form>

          </div>

          {/* Login */}
          <div className="mt-6 text-center text-sm">

            <span className="text-[#5f5f5f]">
              Already have an account?{" "}
            </span>

            <Link
              href="/login"
              className="
                text-[#aaa]
                underline
                underline-offset-4
                transition
                hover:text-[#f0f0f0]
              "
            >
              Sign in
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}