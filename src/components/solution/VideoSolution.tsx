type VideoSolutionProps = {
  videoUrl: string;
};

export default function VideoSolution({
  videoUrl,
}: VideoSolutionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary">
        Video Solution
      </h2>

      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-border bg-surface-2 px-6 text-sm font-medium text-text-secondary transition hover:border-border-strong hover:bg-surface-4 hover:text-text-primary"
      >
        <span className="mr-2 text-lg">▶</span>
        Watch Video Solution
        <span className="ml-2">↗</span>
      </a>
    </div>
  );
}