import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: portfolioData.meta.title,
  description: portfolioData.meta.description,
  metadataBase: new URL(portfolioData.meta.siteUrl),
  authors: [{ name: portfolioData.meta.author }],
  creator: portfolioData.meta.author,
  keywords: [
    "Nitin Mishra",
    "AI Application Developer",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "OpenAI API",
    "Gemini API",
    "LLM Integration",
    "AI Agents",
  ],
  openGraph: {
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    url: portfolioData.meta.siteUrl,
    siteName: `${portfolioData.hero.name} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    creator: "@nitin7414",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme-mode');
    var resolvedTheme = 'dark';
    if (stored === 'light') {
      resolvedTheme = 'light';
    } else if (stored === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } else {
      // Default to dark on first visit regardless of OS
      resolvedTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <meta name="theme-color" content="#0A0A0B" id="theme-color-meta" />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-text selection:bg-accent selection:text-accent-contrast">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-accent focus:border focus:border-border focus:rounded-md focus:shadow-sm text-sm font-mono"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
