"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import {
  Car,
  Fuel,
  Settings,
  Calendar,
  Gauge,
  ChevronsUpDown,
  Check,
} from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white relative rounded-lg shadow-md overflow-hidden">
      {/* Status Badge */}

      {car.status && (
        <span
          className={`
          absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold
          ${
            car.status === "New"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        `}
        >
          {car.status}
        </span>
      )}

      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{car.name}</h3>
            <p className="text-sm text-gray-500">{car.year}</p>
          </div>
          <p className="font-bold text-xl">${car.price.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Gauge size={16} />
            <span className="text-sm">{car.mileage} Miles</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel size={16} />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={16} />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-sm">{car.year}</span>
          </div>
        </div>

        <button className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          View car Details
        </button>
      </div>
    </div>
  );
};

const FilterSection = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const makes = [
    { id: 1, name: "Audi" },
    { id: 2, name: "BMW" },
    { id: 3, name: "Mercedes" },
  ];

  const years = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `${2024 - i}`,
  }));

  const priceRanges = [
    { id: 1, name: "$0 - $25,000" },
    { id: 2, name: "$25,000 - $50,000" },
    { id: 3, name: "$50,000+" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Make Selector */}
        <Listbox value={selectedMake} onChange={setSelectedMake}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
              <span className="block truncate">
                {selectedMake?.name || "Select Make"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {makes.map((make) => (
                  <Listbox.Option
                    key={make.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-red-100 text-red-900" : "text-gray-900"
                      }`
                    }
                    value={make}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {make.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Model Selector - Similar structure to Make */}
        <Listbox value={selectedModel} onChange={setSelectedModel}>
          {/* Similar structure to Make selector */}
        </Listbox>

        {/* Year Selector */}
        <Listbox value={selectedYear} onChange={setSelectedYear}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
              <span className="block truncate">
                {selectedYear?.name || "Select Year"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {years.map((year) => (
                  <Listbox.Option
                    key={year.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-red-100 text-red-900" : "text-gray-900"
                      }`
                    }
                    value={year}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {year.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Price Range Selector */}
        <Listbox value={selectedPrice} onChange={setSelectedPrice}>
          {/* Similar structure to Year selector */}
        </Listbox>
      </div>

      <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
        Find Car
      </button>
    </div>
  );
};

const InventoryPage = () => {
  const sampleCars = [
    {
      name: "Toyota Camry",
      year: 2023,
      price: 40000,
      mileage: 20,
      fuelType: "Petrol",
      transmission: "Automatic",
      imageUrl: "/api/placeholder/400/300",
      status: "New",
    },
    // Add more cars...
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <FilterSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {sampleCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
