import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/hooks/useAuth";
import SessionProvider from "@/components/session-wrapper";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketGO",
  description: "Marketplace de ingressos online.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <NextTopLoader color="#CB1EE8" showSpinner={false} />
              <Header />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
