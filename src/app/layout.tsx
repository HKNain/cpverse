import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { CategoryProvider } from "@/context/CategoryContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CP Verse",
  description: "Competitive programming solutions and explanations",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CategoryProvider>
            <main className="min-w-0 flex-1">
              <Navbar/>
              {children}
              <Analytics />
            </main>
        </CategoryProvider>
      </body>
    </html>
  );
}
