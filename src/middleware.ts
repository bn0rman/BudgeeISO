import {
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    // Custom middleware logic here if needed
  },
  {
    // Disable automatic redirects to Kinde login page
    autoRedirect: false,
    publicPaths: [
      "/", 
      "/api/public", 
      "/marketing",
      "/marketing/features", 
      "/marketing/how-it-works", 
      "/marketing/pricing",
      // Include old paths for redirects to work properly
      "/features", 
      "/how-it-works", 
      "/pricing"
    ],
  }
);

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
  ],
};
