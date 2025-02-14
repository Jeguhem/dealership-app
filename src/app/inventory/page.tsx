"use client";
import React, { useState } from "react";
import { Fuel, Settings, Calendar, Gauge, X, Filter } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import CarSearch from "@/components/searchCar";
import { FormDropDown } from "@/components/Dropdown";

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

interface PriceRange {
  min: number;
  max: number | null;
}

interface PresetRange extends PriceRange {
  id: number;
  label: string;
}

interface CarCardProps {
  car: Car;
}

interface PriceRangeFilterProps {
  filterType: string;
  setFilterType: (type: string) => void;
  customRange: number[];
  setCustomRange: (range: number[]) => void;
  selectedPreset: number | null;
  setSelectedPreset: (id: number) => void;
  onPriceChange: (range: PriceRange) => void;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="bg-white border relative rounded-lg shadow-md overflow-hidden">
    {car.status && (
      <span
        className={`
          absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold
          ${
            car.status === "New"
              ? "bg-green-100 text-green-800"
              : car.status === "Sold"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }
        `}
      >
        {car.status}
      </span>
    )}

    {/* Image container - smaller height on mobile */}
    <div className="relative h-24 sm:h-40 overflow-hidden">
      <Image
        src={car.imageUrl}
        alt={car.name}
        width={250}
        height={150}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content container - reorganized for mobile */}
    <div className="p-2 sm:p-3">
      {/* Price first on mobile */}
      <p className="font-bold text-sm sm:text-md text-left">
        ₦{car.price.toLocaleString()}
      </p>

      {/* Car name and year */}
      <div className="mt-1">
        <h3 className="font-medium text-xs sm:text-sm truncate">{car.name}</h3>
        <p className="text-xs text-gray-500">{car.year}</p>
      </div>

      {/* Car details - hidden on smallest screens */}
      <div className=" grid grid-cols-2 gap-2 mt-2">
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

      <button className="block mt-2 w-full py-1 px-2 border border-gray-300 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition-colors">
        View car Details
      </button>
    </div>
  </div>
);

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  filterType,
  setFilterType,
  customRange,
  setCustomRange,
  selectedPreset,
  setSelectedPreset,
  onPriceChange,
}) => {
  const presetRanges: PresetRange[] = [
    { id: 1, label: "Under $30k", min: 0, max: 30000 },
    { id: 2, label: "$30k - $50k", min: 30000, max: 50000 },
    { id: 3, label: "$50k - $80k", min: 50000, max: 80000 },
    { id: 4, label: "$80k+", min: 80000, max: null },
  ];

  const handlePresetClick = (range: PresetRange) => {
    setSelectedPreset(range.id);
    onPriceChange({ min: range.min, max: range.max });
  };

  const handleCustomRangeChange = (value: number[]) => {
    setCustomRange(value);
    onPriceChange({ min: value[0], max: value[1] });
  };

  const formatPrice = (price: number) => {
    return `$${(price / 1000).toFixed(0)}k`;
  };

  return (
    <div>
      <Tabs defaultValue="preset" onValueChange={setFilterType}>
        <TabsList className="grid w-fit grid-cols-2 mb-4">
          <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
          <TabsTrigger value="custom">Custom Range</TabsTrigger>
        </TabsList>

        <TabsContent value="preset">
          <div className="grid grid-cols-1 gap-2">
            {presetRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handlePresetClick(range)}
                className={`
                  px-4 py-2 rounded-lg text-xs font-medium
                  ${
                    selectedPreset === range.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                  transition-colors
                `}
              >
                {range.label}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="pt-6 pb-2">
            <Slider
              defaultValue={customRange}
              max={200000}
              step={1000}
              value={customRange}
              onValueChange={handleCustomRangeChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(customRange[0])}</span>
            <span>{formatPrice(customRange[1])}</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 600000000,
  });
  const [filterType, setFilterType] = useState("preset");
  const [customRange, setCustomRange] = useState([0, 200000]);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const years = Array.from({ length: 20 }, (_, i) => ({
    value: `${2024 - i}`,
  }));

  const handlePriceChange = (range: PriceRange) => {
    setPriceRange(range);
  };

  const handleClearFilters = () => {
    setSelectedYear(null);
    setPriceRange({ min: 0, max: 200000 });
    setFilterType("preset");
    setCustomRange([0, 200000]);
    setSelectedPreset(null);
  };

  return (
    <div
      className={`
      fixed min-w-[230px] lg:static inset-y-0 left-0 z-40 min-From w-12 bg-white border-r transform
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:transform-none lg:translate-x-0
      transition-transform duration-200 ease-in-out
      overflow-y-auto
    `}
    >
      <div className="p-3">
        <div className="flex justify-between items-center lg:hidden mb-3">
          <h2 className="text-md font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <FormDropDown
            name="year"
            options={years}
            value={selectedYear}
            onSelect={setSelectedYear}
            placeholder="Select Year"
          />

          <PriceRangeFilter
            filterType={filterType}
            setFilterType={setFilterType}
            customRange={customRange}
            setCustomRange={setCustomRange}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            onPriceChange={handlePriceChange}
          />

          <button
            onClick={handleClearFilters}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const InventoryPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sampleCars: Car[] = Array(5).fill({
    name: "Toyota Camry",
    year: 2023,
    price: 40000000,
    mileage: 20,
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/api/placeholder/400/300",
    status: "New",
  });

  return (
    <div className="mx-auto">
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-around gap-4">
              <CarSearch />
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Updated grid with 2 columns on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sampleCars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InventoryPage;
