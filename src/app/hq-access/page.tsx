import prisma from "@/src/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    // Removed the light background, added relative z-10 so it sits above the stars
    <div className="min-h-screen pt-6 pb-16 relative z-10">
      <DashboardClient projects={projects} />
    </div>
  );
}