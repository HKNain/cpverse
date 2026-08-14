"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isSolutionsActive = pathname.startsWith("/solutions");

  return (
    <header className="h-(--navbar-height) border-b border-[#1c1c1c] bg-[#080808]">
      <div className="relative flex h-full items-center px-5">

        {/* Logo / Title */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[#e5e5e5] transition hover:text-white"
        >
          CP Verse
        </Link>

        {/* Center Tab */}
        <nav className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center">
          <Link
            href="/solutions"
            className={`relative flex h-full items-center px-4 text-sm font-medium transition ${
              isSolutionsActive
                ? "text-[#f0f0f0]"
                : "text-[#777] hover:text-[#b5b5b5]"
            }`}
          >
            Solutions

            {/* Active indicator */}
            {isSolutionsActive && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#e5e5e5]" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}