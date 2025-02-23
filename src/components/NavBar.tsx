// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { CircleArrowRight } from "lucide-react";
// import NavLinks from "./NavLinks";

// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Detect the scroll position
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         // You can adjust this threshold
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       className={`flex items-center justify-between py-2 transition-all duration-300 ease-in-out lg:px-7 ${
//         isScrolled ? "fixed left-0 top-0 z-50 w-full bg-white shadow-md" : ""
//       }`}
//     >
//       <p className="text-[24px] font-semibold text-black/60">Logo</p>
//       <NavLinks />
//       <Button className="gap-3 rounded-full bg-slate-700 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
//         <p className="font-semibold">Contact us</p>
//         <CircleArrowRight />
//       </Button>
//     </div>
//   );
// }

// export default Navbar;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CircleArrowRight, Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7">
        {/* Logo */}
        <p className="text-[24px] font-semibold text-black/60">Logo</p>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Contact Button (Visible on larger screens) */}
        <div className="hidden md:block">
          <Button className="gap-3 rounded-full bg-slate-700 transition-transform duration-300 ease-in-out hover:scale-110">
            <p className="font-semibold">Contact us</p>
            <CircleArrowRight />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-16 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLinks />
            <Button className="gap-3 rounded-full bg-slate-700">
              <p className="font-semibold">Contact us</p>
              <CircleArrowRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
