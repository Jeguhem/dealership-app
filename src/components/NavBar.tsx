"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import main_logo from "@/public/main-logo.svg";
import { Button } from "./ui/button";
import { CircleArrowRight } from "lucide-react";
import NavLinks from "./NavLinks";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect the scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // You can adjust this threshold
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between py-2 transition-all duration-300 ease-in-out lg:px-7 ${
        isScrolled ? "fixed left-0 top-0 z-50 w-full bg-white shadow-md" : ""
      }`}
    >
      <p className="text-[24px] font-semibold text-black/60">Logo</p>
      <NavLinks />
      <Button className="gap-3 rounded-full bg-primary-blue transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
        <p className="font-semibold">Contact us</p>
        <CircleArrowRight />
      </Button>
    </div>
  );
}

export default Navbar;
