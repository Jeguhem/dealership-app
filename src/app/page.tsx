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
