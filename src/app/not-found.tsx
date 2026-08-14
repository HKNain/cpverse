import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <p className="mb-4 font-mono text-sm text-text-muted">
          ERROR 404
        </p>

        <h1 className="font-mono text-8xl font-bold tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold">
          Solution not found.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
          The page or solution you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/solutions"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:bg-accent-hover"
          >
            Browse Solutions
          </Link>

          <Link
            href="/"
            className="rounded-md border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium text-text-primary transition hover:bg-surface-4"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}