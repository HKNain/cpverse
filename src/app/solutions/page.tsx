"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { useCategories } from "@/context/CategoryContext";

export default function SolutionsPage() {
  const { categories, loading } = useCategories();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "/" &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      event.preventDefault();

      searchInputRef.current?.focus();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return categories.flatMap((category) =>
      category.solutions
        .filter(
          (solution) =>
            solution.title.toLowerCase().includes(query) ||
            solution.slug.toLowerCase().includes(query),
        )
        .map((solution) => ({
          ...solution,
          categoryName: category.name,
        })),
    );
  }, [search, categories]);

  return (
    <main className="min-h-[calc(100vh-var(--navbar-height))] bg-[#0b0b0b] px-6 py-12 text-[#b5b5b5]">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#666]">
            CP Verse
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[#f0f0f0] sm:text-5xl">
            Competitive Programming
            <br />
            <span className="text-[#999]">Solutions</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#666] sm:text-base">
            Browse competitive programming solutions organized by category and
            problem.
          </p>

          {/* Search */}
          <div className="relative mt-8 w-full max-w-xl">
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#242424] bg-[#111111] px-4 transition focus-within:border-[#3a3a3a]">
              <Search size={18} className="shrink-0 text-[#555]" />

              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems..."
                className="w-full bg-transparent text-sm text-[#ddd] outline-none ring-0 placeholder:text-[#555]"
              />

              <kbd className="hidden rounded border border-[#292929] bg-[#181818] px-2 py-1 text-[11px] text-[#666] sm:block">
                /
              </kbd>
            </div>

            {/* Search Results */}
            {search.trim() && (
              <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-lg border border-[#242424] bg-[#111111] text-left shadow-2xl">
                {loading ? (
                  <div className="p-4 text-sm text-[#666]">
                    Loading problems...
                  </div>
                ) : results.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto p-2">
                    {results.map((solution) => (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        className="block rounded-md px-3 py-3 transition hover:bg-[#1a1a1a]"
                        onClick={() => setSearch("")}
                      >
                        <p className="text-sm font-medium text-[#ddd]">
                          {solution.title}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-mono text-xs text-[#666]">
                            {solution.slug}
                          </span>

                          <span className="text-[#333]">•</span>

                          <span className="text-xs text-[#555]">
                            {solution.categoryName}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center">
                    <p className="text-sm text-[#888]">No problems found</p>

                    <p className="mt-1 text-xs text-[#555]">
                      Try searching by problem name or slug.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Browse */}
        <section className="mt-20">
          <div className="mb-5">
            <h2 className="text-lg font-medium text-[#ddd]">Browse Problems</h2>

            <p className="mt-1 text-sm text-[#666]">
              Select a problem from the sidebar to view its solution.
            </p>
          </div>

          <div className="rounded-lg border border-[#242424] bg-[#111111] p-6">
            <p className="text-sm leading-6 text-[#777]">
              Choose a category from the sidebar to explore available problems
              and their solutions.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
