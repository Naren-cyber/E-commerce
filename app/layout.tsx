import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReduxProvider from "@/stores/ReduxProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "E-Commerce Again",
  description: "E-Commerce Again",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster closeButton expand richColors invert />
        <ReduxProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReduxProvider>
      </body>
    </html>
  );
}
