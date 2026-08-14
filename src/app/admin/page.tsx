"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type FormData = {
  title: string;
  problemUrl: string;
  category: string;
  code: string;
  videoUrl: string;
  timeComplexity: string;
  spaceComplexity: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMode, setCategoryMode] = useState<"existing" | "new">(
    "existing",
  );

  const [form, setForm] = useState<FormData>({
    title: "",
    problemUrl: "",
    category: "",
    code: "",
    videoUrl: "",
    timeComplexity: "",
    spaceComplexity: "",
  });

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setMessage("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // u input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error message when user starts editing
    if (message) {
      setMessage("");
    }
  };

  // Switch category mode
  const changeCategoryMode = (mode: "existing" | "new") => {
    setCategoryMode(mode);

    setForm((prev) => ({
      ...prev,
      category: "",
    }));

    setMessage("");
  };

  // Submit solution
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create solution");
      }

      // Backend should return the created solution
      if (!data.solution?.slug) {
        throw new Error(
          "Solution created, but slug was not returned by the server.",
        );
      }

      // Redirect directly to the created solution
      window.location.href = `/solutions/${data.solution.slug}`;
    } catch (error) {
      console.error("Create solution error:", error);

      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );

      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-var(--navbar-height))] bg-[#0b0b0b] px-4 py-8 text-[#b5b5b5] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666]">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f0f0f0]">
            Create Solution
          </h1>

          <p className="mt-2 text-sm text-[#666]">
            Publish a new competitive programming solution.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm text-[#aaa]">
              Problem Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Two Sum"
              className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
            />
          </div>

          {/* Problem URL */}
          <div>
            <label
              htmlFor="problemUrl"
              className="mb-2 block text-sm text-[#aaa]"
            >
              Problem URL
            </label>

            <input
              id="problemUrl"
              name="problemUrl"
              type="url"
              value={form.problemUrl}
              onChange={handleChange}
              required
              placeholder="https://codeforces.com/problemset/problem/..."
              className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-3 block text-sm text-[#aaa]">Category</label>

            {/* Category mode */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:gap-6">
              {/* Existing */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#aaa]">
                <input
                  type="radio"
                  name="categoryMode"
                  checked={categoryMode === "existing"}
                  onChange={() => changeCategoryMode("existing")}
                  className="accent-[#e5e5e5]"
                />
                Existing category
              </label>

              {/* New */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#aaa]">
                <input
                  type="radio"
                  name="categoryMode"
                  checked={categoryMode === "new"}
                  onChange={() => changeCategoryMode("new")}
                  className="accent-[#e5e5e5]"
                />
                New category
              </label>
            </div>

            {/* Existing category */}
            {categoryMode === "existing" && (
              <>
                {loadingCategories ? (
                  <div className="h-12 animate-pulse rounded-md bg-[#151515]" />
                ) : (
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none transition focus:border-[#3a3a3a]"
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}

            {/* New category */}
            {categoryMode === "new" && (
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="e.g. 1200 Rated"
                className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
              />
            )}

            <p className="mt-2 text-xs text-[#555]">
              {categoryMode === "existing"
                ? "Select an existing solution category."
                : "A new category will be created if it does not already exist."}
            </p>
          </div>

          {/* Complexity */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Time */}
            <div>
              <label
                htmlFor="timeComplexity"
                className="mb-2 block text-sm text-[#aaa]"
              >
                Time Complexity
              </label>

              <input
                id="timeComplexity"
                name="timeComplexity"
                type="text"
                value={form.timeComplexity}
                onChange={handleChange}
                required
                placeholder="O(n)"
                className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
              />
            </div>

            {/* Space */}
            <div>
              <label
                htmlFor="spaceComplexity"
                className="mb-2 block text-sm text-[#aaa]"
              >
                Space Complexity
              </label>

              <input
                id="spaceComplexity"
                name="spaceComplexity"
                type="text"
                value={form.spaceComplexity}
                onChange={handleChange}
                required
                placeholder="O(n)"
                className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
              />
            </div>
          </div>

          {/* Code */}
          <div>
            <label htmlFor="code" className="mb-2 block text-sm text-[#aaa]">
              Solution Code
            </label>

            <textarea
              id="code"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              rows={20}
              spellCheck={false}
              placeholder={`#include <bits/stdc++.h>

using namespace std;

int main() {
    // solution
}`}
              className="w-full resize-y rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm leading-6 text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
            />
          </div>

          {/* Video URL */}
          <div>
            <label
              htmlFor="videoUrl"
              className="mb-2 block text-sm text-[#aaa]"
            >
              Video URL <span className="text-[#555]">(optional)</span>
            </label>

            <input
              id="videoUrl"
              name="videoUrl"
              type="url"
              value={form.videoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none placeholder:text-[#555] transition focus:border-[#3a3a3a]"
            />
          </div>

          {/* Error */}
          {message && (
            <div className="rounded-md border border-[#3a2525] bg-[#151010] px-4 py-3 text-sm text-[#c9a0a0]">
              {message}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end border-t border-[#1c1c1c] pt-6">
            <button
              type="submit"
              disabled={loading || loadingCategories}
              className="rounded-md bg-[#e5e5e5] px-5 py-2.5 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Solution"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
