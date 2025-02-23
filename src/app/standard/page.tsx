import Navbar from "@/components/NavBar";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex h-[100dvh] flex-col items-center justify-center text-center py-16 bg-gray-100">
        <h1 className="text-4xl font-bold">Find Your Dream Car Today</h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore our wide range of luxury and budget-friendly cars.
        </p>
        <Link href="/inventory">
          <button className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-lg text-lg">
            Browse Inventory
          </button>
        </Link>
      </section>

      {/* What We Do Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">What We Do</h2>
        <p className="mt-4 text-lg text-gray-600">
          We provide high-quality new and used cars at unbeatable prices.
        </p>
        <div className="mt-6 w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
          About us illustration
        </div>
      </section>

      {/* New Sell Your Car Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-blue-900 text-white p-8 rounded-lg">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Looking to Buy a Car?</h2>
          <p className="mt-4 text-lg">
            Find your dream car with confidence at <span className="font-medium text-yellow-300">Luxury Car Dealership</span>. We make buying your next car easy, transparent, and stress-free. Here’s why you can trust us:
          </p>
          <ul className="mt-4 text-[12px] lg:text-[16px]  space-y-2">
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  />Transparent pricing with no hidden fees</li>
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  /> Wide selection of certified, high-quality vehicles</li>
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  />Free car valuation and trade-in options</li>
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  /> Fast, secure, and hassle-free buying process</li>
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  /> Expert guidance and support every step of the way</li>
            <li className="flex gap-2 items-center"> <CircleCheckBig className="text-green-500 w-4 h-4"  /> Smooth documentation and seamless ownership transfer</li>
          </ul>
          <Link href="/sell-car">
            <button className="mt-6 bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg">
              Contact Sellers
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
            Image Placeholder
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="mt-4 text-lg text-gray-600">
          Trusted by thousands, we offer the best deals and customer service.
        </p>
        <div className="mt-6 w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
          Achievements illustration
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-white">
        © 2025 Car Dealership. All rights reserved.
      </footer>
    </div>
  );
}