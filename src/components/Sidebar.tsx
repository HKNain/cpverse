"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";

export default function Sidebar() {
  const { categories, loading } = useCategories();

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <aside className="h-full w-68 shrink-0 border-r border-[#1c1c1c] bg-[#080808] p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-32 rounded bg-[#202020]" />
          <div className="h-4 w-40 rounded bg-[#181818]" />
          <div className="h-4 w-36 rounded bg-[#181818]" />
          <div className="h-5 w-28 rounded bg-[#202020]" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full w-68 shrink-0 overflow-y-auto border-r border-[#1c1c1c] bg-[#080808]">
      <div className="p-3">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#666]">
          Solutions
        </p>

        <div className="space-y-1">
          {categories.map((category) => {
            const isCollapsed = collapsed[category.slug] ?? false;

            return (
              <div key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-[#b5b5b5] transition hover:bg-[#151515] hover:text-[#f0f0f0]"
                >
                  <span className="truncate">
                    {category.name}
                  </span>

                  {isCollapsed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {!isCollapsed && (
                  <div className="ml-2 border-l border-[#1c1c1c] pl-2">
                    {category.solutions.map((solution) => (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        className="block truncate rounded-md px-3 py-1.5 text-sm text-[#777] transition hover:bg-[#151515] hover:text-[#e5e5e5]"
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
      </div>
    </aside>
  );
}