import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function RootPage() {
  const { isAuthenticated } = getKindeServerSession();
  
  if (await isAuthenticated()) {
    // Redirect authenticated users to dashboard
    redirect("/dashboard");
  } else {
    // Redirect unauthenticated users to features page
    redirect("/features");
  }
  
  // This won't be reached, but is needed for TypeScript
  return null;
} 