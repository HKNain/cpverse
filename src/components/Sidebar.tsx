"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";

export default function Sidebar() {
  const { categories } = useCategories();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-12 z-40 flex h-10 w-10 items-center justify-center rounded-md border border-[#292929] bg-[#111] text-[#aaa] transition hover:bg-[#181818] hover:text-white md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          border-r border-[#242424]
          bg-[#0b0b0b]
          transition-transform duration-300
          md:static md:z-auto md:w-64
          md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#242424] px-4">
          <span className="text-sm font-semibold text-[#ddd]">
            Solutions
          </span>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#777] transition hover:bg-[#181818] hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Categories */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto p-3">
          {categories.map((category) => {
            const isOpen = openCategories[category.slug];

            return (
              <div key={category.slug} className="mb-1">
                {/* Category */}
                <button
                  onClick={() => toggleCategory(category.slug)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-[#999] transition hover:bg-[#151515] hover:text-[#eee]"
                >
                  <span>{category.name}</span>

                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Solutions */}
                {isOpen && (
                  <div className="ml-3 border-l border-[#292929] pl-2">
                    {category.solutions.map((solution) => (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2 text-xs text-[#666] transition hover:bg-[#151515] hover:text-[#ddd]"
                      >
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}