import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientLayout from "@/components/layouts/client-layout";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import '@/lib/firebase';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModelView AI",
  description: "En son teknoloji AI modellerini keşfedin ve projelerinizde kullanın",
  other: {
    "google-adsense-account": "ca-pub-2964755747044989",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2964755747044989"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary",
          inter.className
        )}
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
