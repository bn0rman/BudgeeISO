import { getUser, isAuthenticated } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUser();
  const data = { 
    message: "Hello User", 
    id: user?.user_metadata?.name || user?.email 
  };

  return NextResponse.json({ data });
}

