"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl text-white">
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Experience{" "}
          {/* <GradientText direction="r" from="yellow-500" to="orange-500">
            Luxury
          </GradientText> */}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Luxury
          </span>
          <br />
          Drive{" "}
          <span className="relative">
            Excellence
            <span className="absolute inset-0 blur-lg text-yellow-400 opacity-50">
              Excellence
            </span>
          </span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-200 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Discover our curated collection of premium vehicles, where luxury
          meets performance.
        </motion.p>
        <motion.div
          className="flex space-x-4 lg:gap-5 justify-center mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link
            href="/inventory"
            className="bg-white text-black px-6 py-3 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
          >
            View Inventory
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
          <button className="border-2 border-white text-white px-6 py-3 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-white/10 transition-colors">
            Book Test Drive
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
