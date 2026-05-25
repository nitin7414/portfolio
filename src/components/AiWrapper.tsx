"use client";

import { usePathname } from "next/navigation";
import AiAgent from "./AiAgent";

export default function AiWrapper() {
  const pathname = usePathname();
  
  // Replace '/secret-admin-url' with whatever your actual dashboard URL is
  if (pathname?.startsWith("/hq-access")) {
    return null; // Don't show the AI on the admin dashboard
  }

  return <AiAgent />;
}