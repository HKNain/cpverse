"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
};

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-code-border bg-code-background">
      {/* Code header */}
      <div className="flex h-11 items-center justify-between border-b border-code-border bg-surface-2 px-4">
        <span className="font-mono text-xs text-text-muted">C++</span>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:bg-surface-4 hover:text-text-primary"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="min-w-max p-5 font-mono text-sm leading-6 text-text-secondary">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}