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
import React from "react";
import {
  // ChevronRight,
  Star,
  Clock,
  Shield,
  DollarSign,
  // Car,
  PhoneCall,
  MapPin,
  Mail,
} from "lucide-react";
import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Cars Section */}
      <FeaturedVehicles />

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
                  &quot;Exceptional service from start to finish. The team went
                  above and beyond to ensure I found my perfect vehicle.&quot;
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
      <Footer />
    </div>
  );
}
