import Navbar from "@/components/NavBar";
import React, { ReactNode } from "react";

interface InventoryLayoutProps {
  children: ReactNode;
}

export default function InventoryLayout({ children }: InventoryLayoutProps) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 lg:px-6 px-1">{children}</main>
    </div>
  );
}
