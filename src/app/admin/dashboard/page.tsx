"use client";
import React, { useState } from "react";
import { Fuel, Settings, Calendar, Gauge, Filter } from "lucide-react";
import Image from "next/image";
import CarSearch from "@/components/searchCar";

interface Car {
  name: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  imageUrl: string;
  status?: "New" | "Sold";
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="bg-white border relative rounded-lg shadow-md overflow-hidden">
    {car.status && (
      <span
        className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold ${
          car.status === "New"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {car.status}
      </span>
    )}

    <div className="relative h-24 sm:h-40 overflow-hidden">
      <Image
        src={car.imageUrl}
        alt={car.name}
        width={250}
        height={150}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-2 sm:p-3">
      <p className="font-bold text-sm sm:text-md text-left">
        ₦{car.price.toLocaleString()}
      </p>
      <div className="mt-1">
        <h3 className="font-medium text-xs sm:text-sm truncate">{car.name}</h3>
        <p className="text-xs text-gray-500">{car.year}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex items-center gap-1">
          <Gauge size={14} />
          <span className="text-xs">{car.mileage} Miles</span>
        </div>
        <div className="flex items-center gap-1">
          <Fuel size={14} />
          <span className="text-xs">{car.fuelType}</span>
        </div>
        <div className="flex items-center gap-1">
          <Settings size={14} />
          <span className="text-xs">{car.transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span className="text-xs">{car.year}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button className="w-full py-1 px-2 border border-gray-300 rounded-md text-xs font-medium  hover:bg-gray-100 transition-colors">
          view car details
        </button>
      </div>
    </div>
  </div>
);

const AdminInventoryPage: React.FC<{}> = ({}) => {
  const sampleCars: Car[] = Array(5).fill({
    name: "Toyota Camry",
    year: 2023,
    price: 40000000,
    mileage: 20,
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/api/placeholder/400/300",
    status: "",
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-col p-4 sm:p-6">
        <div className="mb-4 sm:mb-6 flex items-center justify-around gap-4">
          <CarSearch />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {sampleCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryPage;
