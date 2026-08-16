"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, MessageCircle, PlayCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const features = [
  {
    icon: Code2,
    title: "Code Solutions",
    description:
      "Browse competitive programming problems with clean and understandable solutions, along with time and space complexity.",
    link: "/solutions",
    linkText: "Browse solutions",
    external: false,
  },
  {
    icon: PlayCircle,
    title: "Video Solutions",
    description:
      "Prefer learning visually? Watch detailed video explanations covering the approach, algorithm, and implementation.",
    link: "https://www.youtube.com/@Wincoding007",
    linkText: "Visit YouTube",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Discord Community",
    description:
      "Join our Discord server to discuss problems, share ideas, ask questions, and connect with other competitive programmers.",
    link: "https://discord.gg/3nCuy4GTGP",
    linkText: "Join Discord",
    external: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f0f0f0]">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center px-5 py-16 sm:px-8 lg:px-12">
        {/* Subtle background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-white/2.5 blur-3xl"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-5xl"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-sm text-[#666]"
            >
              competitive programming
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              CP <span className="text-[#777]">Verse</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-7 text-[#888] sm:text-lg sm:leading-8"
            >
              Competitive programming solutions, explanations, and resources
              designed to help you solve problems, understand algorithms, and
              become a better programmer.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/solutions"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium transition hover:bg-gray-950 sm:w-auto"
                >
                  Explore Solutions
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#features"
                  className="inline-flex w-full items-center justify-center rounded-md border border-[#292929] bg-[#111] px-5 py-3 text-sm text-[#aaa] transition hover:bg-[#181818] hover:text-white sm:w-auto"
                >
                  Explore CP Verse
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-[#1d1d1d] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mb-10"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-widest text-[#555]"
            >
              Features
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-3 text-2xl font-bold sm:text-3xl"
            >
              Everything you need to improve at CP.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-xl text-sm leading-6 text-[#777]"
            >
              Learn from solutions, watch explanations, and stay connected with
              the competitive programming community.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.2 },
                  }}
                  className="group rounded-lg border border-[#242424] bg-[#111] p-6 transition-colors duration-300 hover:border-[#3a3a3a]"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-[#292929] bg-[#151515]"
                  >
                    <Icon size={19} className="text-[#aaa]" />
                  </motion.div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#777]">
                    {feature.description}
                  </p>

                  {feature.external ? (
                    <a
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#aaa] transition hover:text-white"
                    >
                      {feature.linkText}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={feature.link}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#aaa] transition hover:text-white"
                    >
                      {feature.linkText}
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#1d1d1d] px-5 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-5xl"
        >
          <div className="rounded-lg border border-[#242424] bg-[#111] px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to start solving?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#777]">
              Explore the problem collection and sharpen your competitive
              programming skills one problem at a time.
            </p>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-7 inline-block"
            >
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium transition hover:bg-gray-950"
              >
                Start Solving
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1d1d1d] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-[#555] sm:flex-row">
          <p>© {new Date().getFullYear()} HKNain Studios</p>

          <p>Built for competitive programmers.</p>
        </div>
      </footer>
    </main>
  );
}
