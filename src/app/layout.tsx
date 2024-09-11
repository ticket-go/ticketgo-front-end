import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { CartPaymentProvider } from "@/hooks/useCartPayment";
import SessionProvider from "@/components/session-wrapper";
import { getServerSession } from "next-auth";
import { revalidateTime } from "@/const/cache";

export const revalidate = revalidateTime;

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
        <CartPaymentProvider>
          <body
            className={cn(
              "w-full min-h-screen bg-background font-sans antialiased overflow-x-hidden",
              inter.className
            )}
          >
            <SessionProvider session={session}>
              <ModalProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <NextTopLoader color="#CB1EE8" showSpinner={false} />
                  <Header />
                  {children}
                </ThemeProvider>
              </ModalProvider>
            </SessionProvider>
          </body>
        </CartPaymentProvider>
      </AuthProvider>
    </html>
  );
}
