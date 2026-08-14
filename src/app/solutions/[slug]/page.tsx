"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import SolutionSkeleton from "@/components/solution/SolutionSkeleton";

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
          throw new Error("Failed to fetch solution");
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

  const copyCode = async () => {
    if (!solution) return;

    await navigator.clipboard.writeText(solution.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return <SolutionSkeleton/>
  }

  if (!solution) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] p-8 text-[#b5b5b5]">
        Solution not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-8 text-[#b5b5b5]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#f0f0f0]">
                {solution.title}
              </h1>

              <p className="mt-2 text-sm text-[#777]">
                Competitive Programming Solution
              </p>
            </div>

            <a
              href={solution.problemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-[#292929] bg-[#151515] px-4 py-2 text-sm text-[#aaa] transition hover:bg-[#1d1d1d] hover:text-[#f0f0f0]"
            >
              Problem URL
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Complexity */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="rounded-md border border-[#242424] bg-[#111111] px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[#666]">
              Time Complexity
            </p>

            <p className="mt-1 font-mono text-sm text-[#ddd]">
              {solution.timeComplexity}
            </p>
          </div>

          <div className="rounded-md border border-[#242424] bg-[#111111] px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[#666]">
              Space Complexity
            </p>

            <p className="mt-1 font-mono text-sm text-[#ddd]">
              {solution.spaceComplexity}
            </p>
          </div>
        </div>

        {/* Code */}
        <section className="overflow-hidden rounded-lg border border-[#242424] bg-[#111111]">

          {/* Code header */}
          <div className="flex items-center justify-between border-b border-[#242424] bg-[#151515] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />

              <span className="ml-3 text-xs text-[#777]">
                solution.cpp
              </span>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs text-[#999] transition hover:bg-[#222] hover:text-[#eee]"
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
          <div className="overflow-x-auto p-5">
            <Highlight
              theme={themes.vsDark}
              code={solution.code}
              language="cpp"
            >
              {({
                className,
                style,
                tokens,
                getLineProps,
                getTokenProps,
              }) => (
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
                      <span className="table-cell select-none pr-5 text-right text-[#444]">
                        {i + 1}
                      </span>

                      <span className="table-cell">
                        {line.map((token, key) => (
                          <span
                            key={key}
                            {...getTokenProps({ token })}
                          />
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
          <div className="mt-6">
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