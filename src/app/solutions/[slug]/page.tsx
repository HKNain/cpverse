"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import SolutionSkeleton from "@/components/solution/SolutionSkeleton";
import NotFound from "@/app/not-found";

type Solution = {
  _id: string;
  title: string;
  slug: string;
  problemUrl: string;
  category: string;
  code: string;
  videoUrl: string;
  timeComplexity: string;
  spaceComplexity: string;
  createdAt: string;
  updatedAt: string;
};

export default function SolutionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchSolution = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/solutions/${slug}`);

        if (!res.ok) {
          setSolution(null);
          return;
        }

        const data = await res.json();

        setSolution(data.solution);
      } catch (error) {
        console.error("Solution fetch error:", error);
        setSolution(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [slug]);

  useEffect(() => {
    if (solution) {
      document.title = `CP Verse | ${solution.title}`;
    }
  }, [solution]);

  const copyCode = async () => {
    if (!solution) return;

    await navigator.clipboard.writeText(solution.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return <SolutionSkeleton />;
  }

  if (!solution) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-[#b5b5b5] sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-[#f0f0f0] sm:text-3xl">
                {solution.title}
              </h1>

              <p className="mt-2 text-xs text-[#777] sm:text-sm">
                Competitive Programming Solution
              </p>
            </div>

            <a
              href={solution.problemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#292929] bg-[#151515] px-4 py-2 text-sm text-[#aaa] transition hover:bg-[#1d1d1d] hover:text-[#f0f0f0] sm:w-auto"
            >
              Problem URL
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Complexity */}
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap">
          <div className="rounded-md border border-[#242424] bg-[#111111] px-4 py-3 sm:w-auto">
            <p className="text-[10px] uppercase tracking-wide text-[#666] sm:text-xs">
              Time Complexity
            </p>

            <p className="mt-1 wrap-break-words font-mono text-xs text-[#ddd] sm:text-sm">
              {solution.timeComplexity}
            </p>
          </div>

          <div className="rounded-md border border-[#242424] bg-[#111111] px-4 py-3 sm:w-auto">
            <p className="text-[10px] uppercase tracking-wide text-[#666] sm:text-xs">
              Space Complexity
            </p>

            <p className="mt-1 wrap-break-words font-mono text-xs text-[#ddd] sm:text-sm">
              {solution.spaceComplexity}
            </p>
          </div>
        </div>

        {/* Code */}
        <section className="overflow-hidden rounded-lg border border-[#242424] bg-[#111111]">
          {/* Code header */}
          <div className="flex flex-col gap-3 border-b border-[#242424] bg-[#151515] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />

              <span className="ml-2 text-[10px] text-[#777] sm:ml-3 sm:text-xs">
                solution.cpp
              </span>
            </div>

            <button
              onClick={copyCode}
              className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-[11px] text-[#999] transition hover:bg-[#222] hover:text-[#eee] sm:text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <div className="overflow-x-auto p-3 sm:p-5">
            <Highlight
              theme={themes.vsDark}
              code={solution.code}
              language="cpp"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    background: "transparent",
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: "1.7",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      className="table-row"
                    >
                      <span className="table-cell select-none pr-3 text-right text-[#444] sm:pr-5">
                        {i + 1}
                      </span>

                      <span className="table-cell whitespace-pre-wrap break-normal">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </section>

        {/* Video */}
        {solution.videoUrl && (
          <div className="mt-5 sm:mt-6">
            <a
              href={solution.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#aaa] underline underline-offset-4 hover:text-white"
            >
              Watch Video Solution
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
