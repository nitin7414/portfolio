import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; // or global.css
import AiAgent from "@/src/components/AiAgent";
import AiWrapper from "@/src/components/AiWrapper";
import StarBackground from "@/src/components/StarBackground"; // IMPORT THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio, projects, and AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Notice the base text color is now white/slate-300 */}
      <body className={`${inter.className} text-slate-300 antialiased relative min-h-screen`}>
        
        {/* THE SPACE BACKGROUND */}
        <StarBackground />

        {/* TOP NAVIGATION BAR - Dark Glassmorphism */}
        <header className="fixed top-0 w-full z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight text-white">
              Portfolio<span className="text-cyan-400">.</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-800 overflow-hidden border-2 border-white/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <img 
                  src="/profile_img.jpeg" 
                  alt="My Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="pt-24 pb-28 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {children}
        </main>

        <AiAgent />
        <AiWrapper />
      </body>
    </html>
  );
}