import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Car Dealership",
  description: "Car dealership in lagos nigeria",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
          <div id="modal-root"></div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
