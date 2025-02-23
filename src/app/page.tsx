// import Navbar from "@/components/NavBar";
// import Link from "next/link";
// import React from "react";

// export default function Home() {
//   return (
//     <div>
//       <Navbar />
//       {/* Hero Section */}
//       <section className="h-screen flex items-center justify-center bg-gray-800 text-white text-center">
//         <div>
//           <h1 className="text-5xl font-bold">Find Your Dream Car Today</h1>
//           <p className="text-lg mt-4">
//             Explore our wide range of luxury and budget-friendly cars.
//           </p>
//           <Link href="/inventory" passHref>
//             <span className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-lg text-lg cursor-pointer inline-block">
//               Browse Inventory
//             </span>
//           </Link>
//         </div>
//       </section>

//       {/* What We Do Section */}
//       <section className="py-20 text-center">
//         <h2 className="text-4xl font-semibold">What We Do</h2>
//         <p className="mt-4 text-lg">
//           We provide high-quality new and used cars at unbeatable prices.
//         </p>
//         <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>About us illustration</span>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="py-20 text-center bg-gray-100">
//         <h2 className="text-4xl font-semibold">Why Choose Us</h2>
//         <p className="mt-4 text-lg">
//           Trusted by thousands, we offer the best deals and customer service.
//         </p>
//         <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>Achievements illustration</span>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black text-white text-center py-6">
//         <p>&copy; 2025 Car Dealership. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// import Navbar from "@/components/NavBar";
// import Link from "next/link";
// import React from "react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
//         <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
//           <div className="md:w-1/2 space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold">
//               Find Your Dream Car Today
//             </h1>
//             <p className="text-xl">
//               Explore our wide range of luxury and budget-friendly cars.
//             </p>
//             <Link
//               href="/inventory"
//               className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md transition-colors"
//             >
//               Browse Inventory
//             </Link>
//           </div>
//           <div className="md:w-1/2 mt-8 md:mt-0">
//             {/* Hero image placeholder */}
//             <div className="w-full h-64 bg-gray-700 rounded-lg" />
//           </div>
//         </div>
//       </section>

//       {/* Services Section (incorporating the screenshot style) */}
//       <section className="bg-blue-900 text-white py-16">
//         <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
//           <div className="md:w-1/2 space-y-6">
//             <h2 className="text-3xl md:text-4xl font-bold">
//               Looking to Buy Your Dream Car?
//             </h2>
//             <p className="text-gray-300">
//               Just contact us, share your preferences, and we'll help you find
//               the perfect match.
//             </p>
//             <ul className="space-y-4">
//               <li className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-green-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span>Free consultation with expert car advisors</span>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-green-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span>Exclusive financing options with competitive rates</span>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-green-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span>Hassle-free paperwork and documentation</span>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <svg
//                   className="w-5 h-5 text-green-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span>Transparent pricing with no hidden fees</span>
//               </li>
//             </ul>
//             <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md transition-colors flex items-center space-x-2">
//               <span>Contact Our Team</span>
//             </button>
//           </div>
//           <div className="md:w-1/2 mt-8 md:mt-0">
//             {/* Car image placeholder */}
//             <div className="w-full h-96 bg-gray-700 rounded-lg" />
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="bg-white py-16">
//         <div className="container mx-auto px-4 md:px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//             Why Choose Us
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center space-y-4">
//               <div className="text-4xl font-bold text-blue-900">1000+</div>
//               <p className="text-gray-600">Happy Customers</p>
//             </div>
//             <div className="text-center space-y-4">
//               <div className="text-4xl font-bold text-blue-900">500+</div>
//               <p className="text-gray-600">Cars Sold</p>
//             </div>
//             <div className="text-center space-y-4">
//               <div className="text-4xl font-bold text-blue-900">4.9/5</div>
//               <p className="text-gray-600">Customer Rating</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2025 Car Dealership. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  Star,
  Clock,
  Shield,
  DollarSign,
  // Car,
  PhoneCall,
  MapPin,
  Mail,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";
import Navbar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const featuredCars = [
    {
      category: "suv",
      name: "Range Rover Sport",
      price: "89,900",
      year: "2024",
      mileage: "0",
    },
    {
      category: "sedan",
      name: "Mercedes S-Class",
      price: "95,500",
      year: "2024",
      mileage: "0",
    },
    {
      category: "sports",
      name: "Porsche 911",
      price: "112,000",
      year: "2024",
      mileage: "0",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-2 lg:px-4 h-[100dvh] bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Experience Luxury <br />
              Drive Excellence
            </h1>
            <p className="text-xl text-gray-200">
              Discover our curated collection of premium vehicles, where luxury
              meets performance.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/inventory"
                className="bg-white text-black px-4 py-2 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                View Inventory
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white px-4 py-2 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-white/10 transition-colors">
                Book Test Drive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our selection of premium vehicles, each chosen for its
              exceptional quality and performance.
            </p>
          </div>

          <div className="flex justify-center mb-8 lg:space-x-4 space-x-3">
            {["all", "suv", "sedan", "sports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200" />{" "}
                {/* Car image placeholder */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {car.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${car.price}
                    </span>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                      Details
                    </button>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-600 space-x-4">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span>{car.mileage} miles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center mt-6 items-center">
          <Link
                href="/inventory"
                className="bg-gradient-to-r w-fit  from-gray-900 to-black overflow-hidden text-white px-4 py-2 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                View Our Collection
              </Link>
              </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Premium Services</h2>
            <p className="text-gray-400">
              Experience unparalleled service and support throughout your luxury
              car buying journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Support",
                description:
                  "Round-the-clock assistance for all your automotive needs",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Extended Warranty",
                description:
                  "Comprehensive coverage options for your peace of mind",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Flexible Financing",
                description:
                  "Tailored financial solutions to match your requirements",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-lg text-center"
              >
                <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                &quot;Exceptional service from start to finish. The team went above
                  and beyond to ensure I found my perfect vehicle.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />{" "}
                  {/* Avatar placeholder */}
                  <div className="ml-4">
                    <h4 className="font-bold">John Smith</h4>
                    <p className="text-gray-500">Satisfied Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <PhoneCall className="w-6 h-6" />,
                  title: "Call Us",
                  info: "+1 (555) 123-4567",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Visit Us",
                  info: "123 Luxury Lane, Beverly Hills, CA 90210",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  info: "contact@luxuryautos.com",
                },
              ].map((contact, index) => (
                <div key={index} className="text-center">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-gray-600">{contact.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-2 lg:px-4 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Leading luxury car dealership with over 20 years of excellence
                in automotive retail.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/inventory">Inventory</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/financing">Financing</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>New Cars</li>
                <li>Pre-Owned Vehicles</li>
                <li>Car Maintenance</li>
                <li>Auto Financing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                {/* <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div className="w-10 h-10 bg-white/10 rounded-full" /> */}

                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Twitter className="text-white w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Instagram className="text-white w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Facebook className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 Luxury Auto Dealership. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
