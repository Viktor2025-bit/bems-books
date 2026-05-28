import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Providers } from "@/components/providers/Providers";
import { GoogleSignInPrompt } from "@/components/auth/GoogleSignInPrompt";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bems Books | Premium E-book Store",
  description: "Discover and read the best e-books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jost.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AnnouncementBar />
          <Header />
          <GoogleSignInPrompt />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
