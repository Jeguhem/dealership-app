"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import range_rover from "@/public/image/range-rover.jpg";
import bmw_x5 from "@/public/image/BMW-X5.jpg";
import mercedes_g63 from "@/public/image/Mercedes-G63.jpg";

import imagePlaceholder from "@/public/image/placeholder.jpeg";

import s_class from "@/public/image/mercedes-s-class.jpg";
import tesla_model_s from "@/public/image/Tesla-Models.jpg";
import bmw_7series from "@/public/image/BMW7-Series.jpg";

import porsche_911 from "@/public/image/Porsche-911.jpg";
import ferrari_f8 from "@/public/image/Ferrari-F8.jpg";
import lamborghini_huracan from "@/public/image/Lamborghini-Huracán.jpg";
import { FadeInText, SlideDownText, SlideInText, SlideUpText } from "./animate";

function FeaturedVehicles() {
  const [activeTab, setActiveTab] = useState("all");

  // 🚙 Separate objects for each category
  const allCars = [
    {
      name: "Range Rover Sport",
      price: "89,900,000",
      year: "2020",
      mileage: "0",
      image: range_rover,
    },
    {
      name: "Mercedes S-Class",
      price: "295,500,000",
      year: "2024",
      mileage: "0",
      image: s_class,
    },
    {
      name: "Porsche 911",
      price: "212,000,000",
      year: "2024",
      mileage: "0",
      image: porsche_911,
    },
  ];

  const suvs = [
    {
      name: "Range Rover Sport",
      price: "89,900,000",
      year: "2020",
      mileage: "0",
      image: range_rover,
    },
    {
      name: "BMW X5",
      price: "75,000,000",
      year: "2022",
      mileage: "0",
      image: bmw_x5,
    },
    {
      name: "Mercedes G63 AMG",
      price: "250,000,000",
      year: "2023",
      mileage: "0",
      image: mercedes_g63,
    },
  ];

  const sedans = [
    {
      name: "Mercedes S-Class",
      price: "295,500,000",
      year: "2024",
      mileage: "0",
      image: s_class,
    },
    {
      name: "Tesla Model S",
      price: "140,000,000",
      year: "2023",
      mileage: "0",
      image: tesla_model_s,
    },
    {
      name: "BMW 7 Series",
      price: "120,000,000",
      year: "2023",
      mileage: "0",
      image: bmw_7series,
    },
  ];

  const sports = [
    {
      name: "Porsche 911",
      price: "212,000,000",
      year: "2024",
      mileage: "0",
      image: porsche_911,
    },
    {
      name: "Ferrari F8 Tributo",
      price: "350,000,000",
      year: "2024",
      mileage: "0",
      image: ferrari_f8,
    },
    {
      name: "Lamborghini Huracán",
      price: "400,000,000",
      year: "2024",
      mileage: "0",
      image: lamborghini_huracan,
    },
  ];

  // Switch case to determine which cars to display
  const getCarsToDisplay = () => {
    switch (activeTab) {
      case "suv":
        return suvs;
      case "sedan":
        return sedans;
      case "sports":
        return sports;
      default:
        return allCars;
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SlideDownText delay={0} duration={0.8}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
          </SlideDownText>
          <FadeInText delay={0.5}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our selection of premium vehicles, each chosen for its
              exceptional quality and performance.
            </p>
          </FadeInText>
        </div>

        {/* Filter Tabs */}
        <SlideInText delay={0.8} duration={0.7}>
          <div className="flex justify-center mb-8 lg:space-x-4 space-x-3">
            {["all", "suv", "sedan", "sports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${
                  activeTab === tab
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </SlideInText>

        {/* Vehicle Cards Grid */}

        <Transition
          show={true} // or some other condition
          enter="transition duration-700 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-300 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {getCarsToDisplay().map((car, index) => (
              <div key={index}>
                <FadeInText delay={1} duration={1}>
                  <div
                    //   key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    {car.image ? (
                      <Image
                        src={car.image}
                        alt={car.name}
                        height={500}
                        width={500}
                        className="object-cover h-64"
                      />
                    ) : (
                      // <div className="h-64 bg-gray-400" />
                      <Image
                        src={imagePlaceholder}
                        alt={car.name}
                        height={500}
                        width={500}
                        className="object-cover h-64"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.name}
                      </h3>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold text-gray-900">
                          ₦{car.price}
                        </span>
                        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
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
                </FadeInText>
              </div>
            ))}
          </div>
        </Transition>

        {/* View All Button */}
        <SlideUpText delay={1} duration={0.5}>
          <div className="flex w-full justify-center mt-6 items-center">
            <Link
              href="/inventory"
              className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 lg:px-8 lg:py-4 text-[14px] lg:text-[16px] rounded-md font-semibold hover:bg-gray-800 transition-all"
            >
              View Our Collection
            </Link>
          </div>
        </SlideUpText>
      </div>
    </section>
  );
}

export default FeaturedVehicles;
