<<<<<<< HEAD
// import Navbar from "@/components/NavBar";
// import React from "react";

// export default function AboutUs() {
//   return (
//     <div>
//       <Navbar />
//       {/* Hero Section */}
//       <section className="h-[60vh] flex items-center justify-center bg-gray-800 text-white text-center">
//         <div>
//           <h1 className="text-5xl font-bold">About Us</h1>
//           <p className="text-lg mt-4">
//             Learn more about our journey, mission, and values.
//           </p>
//         </div>
//       </section>

//       {/* Our Story */}
//       <section className="py-20 px-6 text-center">
//         <h2 className="text-4xl font-semibold">Our Story</h2>
//         <p className="mt-4 text-lg max-w-3xl mx-auto">
//           Founded with a passion for cars, we have been connecting people with
//           their dream vehicles for years. Our commitment to quality and
//           excellence has made us a trusted name in the industry.
//         </p>
//         <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>Company history illustration</span>
//         </div>
//       </section>

//       {/* Our Mission */}
//       <section className="py-20 bg-gray-100 text-center px-6">
//         <h2 className="text-4xl font-semibold">Our Mission</h2>
//         <p className="mt-4 text-lg max-w-3xl mx-auto">
//           To provide a seamless car-buying experience with a focus on customer
//           satisfaction, quality vehicles, and transparent transactions.
//         </p>
//         <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>Mission illustration</span>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-20 text-center px-6">
//         <h2 className="text-4xl font-semibold">Why Choose Us?</h2>
//         <p className="mt-4 text-lg max-w-3xl mx-auto">
//           Our dedication to excellence, customer-first approach, and vast
//           inventory make us the top choice for car buyers.
//         </p>
//         <div className="mt-8 h-48 w-full bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>Why choose us illustration</span>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black text-white text-center py-6">
//         <p>&copy; 2025 Car Dealership. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

"use client";
import React from "react";
import { Shield, Users, Award, Target, ChevronRight } from "lucide-react";
=======
import React from 'react';
import { Shield, Users, Award, Target, ChevronRight } from 'lucide-react';
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
import Navbar from "@/components/NavBar";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
<<<<<<< HEAD

      {/* Hero Section */}
      <section className="relative py-24 bg-black">
=======
      
      {/* Hero Section */}
      <section className="relative mt-[70px] py-24 bg-black">
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Our Legacy of Excellence
            </h1>
            <p className="text-xl text-gray-300">
<<<<<<< HEAD
              For over two decades, we've been more than just a dealership.
              We're your trusted partner in finding the perfect luxury vehicle.
=======
              For over two decades, we&apos;ve been more than just a dealership. 
              We&apos;re your trusted partner in finding the perfect luxury vehicle.
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-600">
<<<<<<< HEAD
                Founded in 2000, Luxury Auto Dealership began with a simple
                vision: to provide an unparalleled luxury car buying experience.
                What started as a small showroom has grown into one of the most
                prestigious dealerships in the region.
              </p>
              <p className="text-gray-600">
                Our journey has been marked by an unwavering commitment to
                excellence, building lasting relationships with our clients, and
                staying at the forefront of automotive innovation.
=======
                Founded in 2000, Luxury Auto Dealership began with a simple vision: 
                to provide an unparalleled luxury car buying experience. What started 
                as a small showroom has grown into one of the most prestigious 
                dealerships in the region.
              </p>
              <p className="text-gray-600">
                Our journey has been marked by an unwavering commitment to excellence, 
                building lasting relationships with our clients, and staying at the 
                forefront of automotive innovation.
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="border-l-4 border-black pl-4">
                  <div className="text-4xl font-bold text-black">20+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <div className="text-4xl font-bold text-black">10k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <div className="h-96 bg-gray-200 rounded-lg" />{" "}
            {/* Image placeholder */}
=======
            <div className="h-96 bg-gray-200 rounded-lg" /> {/* Image placeholder */}
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
<<<<<<< HEAD
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600">
              These principles guide everything we do and define our commitment
              to you.
            </p>
          </div>

=======
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide everything we do and define our commitment to you.
            </p>
          </div>
          
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Integrity",
<<<<<<< HEAD
                description: "Honesty and transparency in every transaction",
=======
                description: "Honesty and transparency in every transaction"
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Customer First",
<<<<<<< HEAD
                description: "Your satisfaction is our top priority",
=======
                description: "Your satisfaction is our top priority"
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence",
<<<<<<< HEAD
                description: "Committed to the highest standards",
=======
                description: "Committed to the highest standards"
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Innovation",
<<<<<<< HEAD
                description: "Embracing the future of automotive",
              },
=======
                description: "Embracing the future of automotive"
              }
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-black text-white rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
<<<<<<< HEAD
          <h2 className="text-4xl font-bold text-center mb-16">
            Meet Our Leadership
          </h2>
=======
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Leadership</h2>
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Anderson",
                position: "CEO & Founder",
<<<<<<< HEAD
                bio: "25+ years of automotive industry experience",
=======
                bio: "25+ years of automotive industry experience"
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              },
              {
                name: "Sarah Chen",
                position: "Sales Director",
<<<<<<< HEAD
                bio: "Luxury vehicle specialist with 15 years experience",
=======
                bio: "Luxury vehicle specialist with 15 years experience"
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
              },
              {
                name: "James Wilson",
                position: "Service Manager",
<<<<<<< HEAD
                bio: "Master certified automotive technician",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6" />{" "}
                {/* Photo placeholder */}
=======
                bio: "Master certified automotive technician"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6" /> {/* Photo placeholder */}
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-900 mb-2">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Our Certifications</h2>
            <div className="grid grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((_, index) => (
<<<<<<< HEAD
                <div
                  key={index}
                  className="h-24 bg-white rounded-lg shadow-md"
                />
=======
                <div key={index} className="h-24 bg-white rounded-lg shadow-md" /> 
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
                // Certification logo placeholders
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
<<<<<<< HEAD
          <h2 className="text-4xl font-bold mb-8">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit our showroom today and let our team of experts help you find
            your perfect vehicle.
          </p>
          <Link
=======
          <h2 className="text-4xl font-bold mb-8">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit our showroom today and let our team of experts help you find your perfect vehicle.
          </p>
          <Link 
>>>>>>> ebeb4c8b094ceef9f3fc0d2ba040ea882a43bba2
            href="/contact"
            className="inline-flex items-center bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Luxury Auto Dealership. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}