// This is a server component
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Sidebar } from "@/components/Sidebar";
import ScrollAnimations from "@/components/ScrollAnimations";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex h-screen bg-gray-50">
      <ScrollAnimations />
      
      <Sidebar user={user} />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white">
        <main className="animate-fade-in">{children}</main>
      </div>
    </div>
  );
} 