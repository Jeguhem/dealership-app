import Navbar from "@/components/NavBar";
// import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gray-800 text-white text-center">
        <div>
          <h1 className="text-5xl font-bold">Find Your Dream Car Today</h1>
          <p className="text-lg mt-4">
            Explore our wide range of luxury and budget-friendly cars.
          </p>
          <a href="/inventory">
            <button className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-lg text-lg">
              Browse Inventory
            </button>
          </a>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-semibold">What We Do</h2>
        <p className="mt-4 text-lg">
          We provide high-quality new and used cars at unbeatable prices.
        </p>
        <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <span>About us illustration</span>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 text-center bg-gray-100">
        <h2 className="text-4xl font-semibold">Why Choose Us</h2>
        <p className="mt-4 text-lg">
          Trusted by thousands, we offer the best deals and customer service.
        </p>
        <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <span>Achievements illustration</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <p>&copy; 2025 Car Dealership. All rights reserved.</p>
      </footer>
    </div>
  );
}
