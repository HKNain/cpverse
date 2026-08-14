export default function SolutionSkeleton() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-8">
      <div className="mx-auto max-w-5xl skeleton">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">

            {/* Title */}
            <div className="flex-1">
              <div className="h-9 w-64 rounded-lg bg-[#252525] sm:h-10 sm:w-80" />

              {/* Subtitle */}
              <div className="mt-3 h-4 w-52 rounded-md bg-[#1c1c1c]" />
            </div>

            {/* Problem button */}
            <div className="h-10 w-28 rounded-md bg-[#202020]" />
          </div>
        </div>

        {/* Complexity boxes */}
        <div className="mb-6 flex flex-wrap gap-3">

          {/* Time */}
          <div className="h-18 w-40 rounded-md bg-[#191919]" />

          {/* Space */}
          <div className="h-18 w-40 rounded-md bg-[#191919]" />
        </div>

        {/* Code */}
        <section className="overflow-hidden rounded-lg border border-[#242424] bg-[#111111]">

          {/* Code header */}
          <div className="flex h-12 items-center justify-between border-b border-[#242424] bg-[#151515] px-4">

            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#303030]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#303030]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#303030]" />

              <div className="ml-3 h-3 w-24 rounded bg-[#292929]" />
            </div>

            {/* Copy button */}
            <div className="h-7 w-16 rounded-md bg-[#252525]" />
          </div>

          {/* Code lines */}
          <div className="space-y-3 p-5">

            <div className="h-4 w-[85%] rounded bg-[#252525]" />
            <div className="h-4 w-[65%] rounded bg-[#202020]" />
            <div className="h-4 w-[72%] rounded bg-[#252525]" />
            <div className="h-4 w-[50%] rounded bg-[#202020]" />
            <div className="h-4 w-[80%] rounded bg-[#252525]" />
            <div className="h-4 w-[60%] rounded bg-[#202020]" />
            <div className="h-4 w-[90%] rounded bg-[#252525]" />
            <div className="h-4 w-[45%] rounded bg-[#202020]" />
            <div className="h-4 w-[70%] rounded bg-[#252525]" />
            <div className="h-4 w-[55%] rounded bg-[#202020]" />
            <div className="h-4 w-[82%] rounded bg-[#252525]" />
            <div className="h-4 w-[40%] rounded bg-[#202020]" />
          </div>
        </section>

        {/* Video solution */}
        <div className="mt-6">
          <div className="h-5 w-36 rounded-md bg-[#242424]" />

          <div className="mt-3 h-10 w-48 rounded-md bg-[#1e1e1e]" />
        </div>
      </div>
    </main>
  );
}