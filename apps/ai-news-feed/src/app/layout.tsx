import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI News Feed - Tooling Ecosystem Updates",
  description:
    "Stay up to date with the latest AI tools, practices, and ecosystem news from your favorite YouTube channels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight">
                    AI News Feed
                  </h1>
                  <p className="text-xs text-zinc-500">
                    Tooling ecosystem updates
                  </p>
                </div>
              </div>
              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                Open NotebookLM
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
          AI News Feed &mdash; Powered by YouTube RSS &amp; NotebookLM
        </footer>
      </body>
    </html>
  );
}
