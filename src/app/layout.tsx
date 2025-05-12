import "./globals.css";
import { Providers } from "@/components/Providers";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata = {
  title: "Budgee ISO",
  description: "ISO27001 Certification Made Simple",
};

// Root layout - applies to all routes
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MarketingLayout>
            {children}
          </MarketingLayout>
        </Providers>
      </body>
    </html>
  );
}
