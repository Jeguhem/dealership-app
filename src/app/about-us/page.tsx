import Navbar from "@/components/NavBar";
import React from "react";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="h-[60vh] flex items-center justify-center bg-gray-800 text-white text-center">
        <div>
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="text-lg mt-4">
            Learn more about our journey, mission, and values.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Our Story</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Founded with a passion for cars, we have been connecting people with
          their dream vehicles for years. Our commitment to quality and
          excellence has made us a trusted name in the industry.
        </p>
        <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <span>Company history illustration</span>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-100 text-center px-6">
        <h2 className="text-4xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          To provide a seamless car-buying experience with a focus on customer
          satisfaction, quality vehicles, and transparent transactions.
        </p>
        <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <span>Mission illustration</span>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-semibold">Why Choose Us?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Our dedication to excellence, customer-first approach, and vast
          inventory make us the top choice for car buyers.
        </p>
        <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <span>Why choose us illustration</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <p>&copy; 2025 Car Dealership. All rights reserved.</p>
      </footer>
    </div>
  );
}
