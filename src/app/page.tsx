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

import Navbar from "@/components/NavBar";
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
          <h2 className="text-3xl font-bold">Looking to Sell Your Car?</h2>
          <p className="mt-4 text-lg">
            Get the best value for your car with our hassle-free selling
            process. We help you:
          </p>
          <ul className="mt-4 space-y-2">
            <li>✔ Free car valuation and consultation</li>
            <li>✔ Fast and secure payment process</li>
            <li>✔ Wide network of buyers for quick sales</li>
            <li>✔ Smooth documentation and transfer</li>
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
