import Navbar from "@/components/NavBar";
import React from "react";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex h-[80vh] justify-center items-center">
        <p className="text-[32px] font-semibold ">Landing page</p>
      </div>
    </div>
  );
}
