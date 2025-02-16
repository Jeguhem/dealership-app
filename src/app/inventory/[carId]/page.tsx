"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Gauge,
  Calendar,
  Car,
  Palette,
  Factory,
  MapPin,
  Fuel,
  Cog,
  HardDrive,
  PlusCircle,
} from "lucide-react";
import { PiEngine } from "react-icons/pi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation"; // Use usePathname to extract the id
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface CarDetails {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  status: string;
  images: string[];
  drivetrain?: string;
  extras?: string;
}

const ProductDetailsPage = () => {
  const pathname = usePathname(); // Get the full pathname
  const id = pathname.split("/").pop(); // Extract the last segment as the id
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch car details using React Query
  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id], // Unique key for caching
    queryFn: async () => {
      if (!id) throw new Error("Invalid car ID"); // Ensure id is valid
      const response = await fetch(`/api/cars/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });

  const nextImage = () => {
    if (car) {
      setCurrentImageIndex((prev) =>
        prev === car.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (car) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? car.images.length - 1 : prev - 1
      );
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const specIcons = {
    make: Car,
    model: Car,
    year: Calendar,
    mileage: Gauge,
    fuelType: Fuel,
    transmission: Cog,
    status: Factory,
    drivetrain: HardDrive,
    extras: PlusCircle,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading car details: {error.message}
      </div>
    );
  }

  if (!car) {
    return <div className="text-center">Car not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Header - Fixed at top */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 border-b">
        <h1 className="text-lg font-semibold truncate">
          {car.make} {car.model} {car.year}
        </h1>
        <p className="text-xl font-bold text-blue-600">
          ₦ {car.price.toLocaleString()}
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 pt-20 md:pt-6 space-y-4">
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image slider section */}
          <div className="md:col-span-2 space-y-2">
            <div className="relative">
              <div className="relative aspect-[4/3] md:aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model} - Image ${
                    currentImageIndex + 1
                  }`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded-md text-xs md:text-sm">
                  {currentImageIndex + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnail preview - Scrollable on mobile */}
              <div className="flex gap-2 mt-2 overflow-x-auto pb-2 snap-x">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-none w-16 md:w-20 h-16 md:h-20 rounded-md overflow-hidden snap-start ${
                      index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact card - Sticky on desktop, Fixed at bottom on mobile */}
          <div className="md:block">
            <div className="hidden md:block sticky top-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      {car.make} {car.model} {car.year}
                    </h2>
                    <p className="text-3xl font-bold text-blue-600">
                      ₦ {car.price.toLocaleString()}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Lagos State, Surulere
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      WhatsApp
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <Phone className="w-5 h-5" />
                      Show contact
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="lg:pb-10 pb-32">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-blue-600" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cog className="w-5 h-5 text-blue-600" />
                      <span>{car.transmission}</span>
                    </div>
                    {car.drivetrain && (
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-blue-600" />
                        <span>{car.drivetrain}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Factory className="w-5 h-5 text-blue-600" />
                      <span>{car.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    General information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries({
                      make: car.make,
                      model: car.model,
                      year: car.year,
                      mileage: `${car.mileage} km`,
                      fuelType: car.fuelType,
                      transmission: car.transmission,
                      status: car.status,
                      drivetrain: car.drivetrain,
                      extras: car.extras,
                    }).map(([key, value]) => {
                      const IconComponent = specIcons[key];
                      return (
                        <div key={key} className="border-b pb-2">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            {IconComponent && (
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            )}
                            {key.toUpperCase()}
                          </div>
                          <p className="font-medium mt-1">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t p-4 space-y-2">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            WhatsApp
          </button>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Phone className="w-5 h-5" />
            Show contact
          </button>
        </div>
      </div>

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default ProductDetailsPage;
