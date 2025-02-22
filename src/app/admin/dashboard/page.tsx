"use client";
import React, { useState } from "react";
import { Fuel, Settings, Calendar, Gauge } from "lucide-react";
import Image from "next/image";
import CarSearch from "@/components/searchCar";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  images: string[];
  status?: "New" | "Sold";
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`dashboard/${car._id}`);
  };
  return (
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
          src={car.images[0] || "/placeholder.jpg"}
          alt=""
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
          <h3 className="font-medium text-xs sm:text-sm truncate">
            {car.make} {car.model}
          </h3>
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
          <button
            onClick={handleViewDetails}
            className="w-full py-1 px-2 border border-gray-300 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors"
          >
            View Car Details
          </button>
        </div>
      </div>
    </div>
  );
};

const fetchCarsWithParams = async (params: URLSearchParams) => {
  const response = await fetch(
    `/api/cars${params.toString() ? `?${params.toString()}` : ""}`
  );
  if (!response.ok) throw new Error("Failed to fetch cars");
  return response.json();
};

const fetchTotalCars = async () => {
  const response = await fetch("http://localhost:3000/api/cars/count");
  if (!response.ok) throw new Error("Failed to fetch total cars");
  const data = await response.json();
  return data.total;
};

const AdminInventoryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    make: null,
    model: null,
  });

  // Generate years for dropdown (current year - 20 years)
  const years = Array.from({ length: 20 }, (_, i) => ({
    value: `${2024 - i}`,
    label: `${2024 - i}`,
  }));

  // Build query params
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchParams.make) params.set("make", searchParams.make);
    if (searchParams.model) params.set("model", searchParams.model);
    if (selectedYear) params.set("year", selectedYear);
    return params;
  };

  // Fetch cars with React Query
  const {
    data: cars = [],
    isLoading: carsLoading,
    error: carsError,
  } = useQuery({
    queryKey: ["cars", searchParams, selectedYear],
    queryFn: () => fetchCarsWithParams(buildQueryParams()),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  // Fetch total cars count
  const { data: totalCars } = useQuery({
    queryKey: ["totalCars"],
    queryFn: fetchTotalCars,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  // Handle search
  const handleSearch = ({ make, model }) => {
    setSearchParams({ make, model });
  };

  // Handle year change
  const handleYearChange = (value: string) => {
    setSelectedYear(value === "all" ? null : value);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedYear(null);
    setSearchParams({ make: null, model: null });
  };

  if (carsLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (carsError) {
    return (
      <div className="text-center mt-32 text-red-600">
        Error loading cars:{" "}
        {carsError instanceof Error ? carsError.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-col p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex w-full justify-center items-center py-3 gap-2">
            <p className="font-medium">Total cars:</p>
            <p className="font-bold">{totalCars || 0}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-2/3">
              <CarSearch onSearch={handleSearch} />
            </div>
            <div className="w-full max-h-[80px] sm:w-1/3">
              <Select
                value={selectedYear || "all"}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryPage;
