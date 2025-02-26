"use client";
import React, { useState } from "react";
import { X, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import CarSearch from "@/components/searchCar";
import { FormDropDown } from "@/components/Dropdown";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import Navbar from "@/components/NavBar";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Types
interface Car {
  _id: string;
  name: string;
  make: string;
  carModel: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  images: string[];
  status?: "New" | "Sold";
}

interface PriceRange {
  min: number | null;
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
  onPriceChange: (range: PriceRange) => void;
  onYearChange: (year: string | null) => void;
}

const CarCard = ({ car }: CarCardProps) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/inventory/${car._id}`);
  };

  // Helper function to determine badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-green-500 text-white";
      case "Sold":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white"; // Available or other status
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            car.images && car.images.length > 0
              ? car.images[0]
              : "/placeholder.jpg"
          }
          alt={`${car.make} ${car.carModel}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {car.status && (
          <div
            className={`absolute top-3 right-3 py-1 px-3 rounded-full text-xs font-semibold ${getStatusBadgeClass(
              car.status
            )}`}
          >
            {car.status}
          </div>
        )}
      </div>

      {/* Car Details */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <p className=" font-semibold text-blue-600">
            ₦ {car.price.toLocaleString()}
          </p>
        </div>

        {/* Make, Model and Year */}
        <div className="mb-3">
          <h3 className="text-xs md:text-md  font-bold text-gray-800">
            {car.make} {car.carModel}
          </h3>
          <p className="text-sm text-gray-600">{car.year}</p>
        </div>

        {/* Specs */}
        <div className="flex gap-2 font-medium  mb-4">
          <div className="flex items-center bg-gray-100 px-1 py-[2px] rounded-sm w-fit  text-xs text-slate-800">
            {/* <Gauge size={16} className="text-gray-600 pr-1" /> */}
            {car.mileage} KM
          </div>

          <div className="flex items-center bg-gray-100 px-1 py-[2px] rounded-sm w-fit  text-xs text-slate-800">
            {car.transmission}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-blue-600 text-xs md:text-sm font-medium hover:bg-blue-700 text-white py-1 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          View Car Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// const CarCard: React.FC<CarCardProps> = ({ car }) => {
//   const router = useRouter();

//   const handleViewDetails = () => {
//     router.push(`/inventory/${car._id}`);
//   };

//   return (
//     <div className="bg-white border relative rounded-lg shadow-md overflow-hidden">
//       {car.status && (
//         <span
//           className={`
//             absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold
//             ${
//               car.status === "New"
//                 ? "bg-green-100 text-green-800"
//                 : car.status === "Sold"
//                 ? "bg-red-100 text-red-800"
//                 : "bg-gray-100 text-gray-800"
//             }
//           `}
//         >
//           {car.status}
//         </span>
//       )}

//       <div className="relative h-24 sm:h-40 overflow-hidden">
//         <Image
//           src={
//             Array.isArray(car.images) && car.images.length > 0
//               ? car.images[0]
//               : "/placeholder.jpg"
//           }
//           alt={car.name}
//           width={250}
//           height={150}
//           className="w-full h-full object-cover"
//           unoptimized={false}
//         />
//       </div>

//       <div className="p-2 sm:p-3">
//         <p className="font-bold text-sm sm:text-md text-left">
//           ₦{car.price.toLocaleString()}
//         </p>

//         <div className="mt-1">
//           <h3 className="font-medium text-xs sm:text-sm truncate">
//             {car.make} {car.model}
//           </h3>
//           <p className="text-xs text-gray-500">{car.year}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-2">
//           <div className="flex items-center gap-1">
//             <Gauge size={14} />
//             <span className="text-xs">{car.mileage} Miles</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Fuel size={14} />
//             <span className="text-xs">{car.fuelType}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Settings size={14} />
//             <span className="text-xs">{car.transmission}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Calendar size={14} />
//             <span className="text-xs">{car.year}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleViewDetails}
//           className="block mt-2 w-full py-1 px-2 border border-gray-300 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition-colors"
//         >
//           View Car Details
//         </button>
//       </div>
//     </div>
//   );
// };

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  setFilterType,
  customRange,
  setCustomRange,
  selectedPreset,
  setSelectedPreset,
  onPriceChange,
}) => {
  const presetRanges: PresetRange[] = [
    { id: 1, label: "Under ₦30m", min: 0, max: 30000000 },
    { id: 2, label: "₦30m - ₦50m", min: 30000000, max: 50000000 },
    { id: 3, label: "₦50m - ₦100m", min: 50000000, max: 80000000 },
    { id: 4, label: "₦100m+", min: 100000000, max: null },
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

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onPriceChange,
  onYearChange,
}) => {
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
    console.log(priceRange);
    onPriceChange(range);
  };

  const handleYearChange = (year: string | null) => {
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleClearFilters = () => {
    setSelectedYear(null);
    setPriceRange({ min: 0, max: 200000 });
    setFilterType("preset");
    setCustomRange([0, 200000]);
    setSelectedPreset(null);

    onPriceChange({ min: 0, max: null });
    onYearChange(null);
  };

  return (
    <div
      className={`
      fixed min-w-[230px] md:pt-0 pt-20 lg:static inset-y-0 left-0 z-40 min-From w-12 bg-white border-r transform
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
            onSelect={handleYearChange}
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
  interface Filters {
    make: string | null;
    model: string | null;
    year: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minMileage: number | null;
    maxMileage: number | null;
  }

  const [filters, setFilters] = useState<Filters>({
    make: null,
    model: null,
    year: null,
    minPrice: null,
    maxPrice: null,
    minMileage: null,
    maxMileage: null,
  });

  const {
    data: cars = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Only add parameters if they have non-null values
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null) {
          params.set(key, value.toString());
        }
      });

      const response = await fetch(
        `/api/cars${params.toString() ? `?${params.toString()}` : ""}`
      );
      if (!response.ok) throw new Error("Failed to fetch cars");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const handleSearch = ({
    make,
    model,
  }: {
    make: string | null;
    model: string | null;
  }) => {
    setFilters((prev) => ({
      ...prev,
      make: make || null,
      model: model || null,
    }));
  };

  const handlePriceChange = (range: PriceRange) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: range.min,
      maxPrice: range.max,
    }));
  };

  const handleYearChange = (year: string | null) => {
    setFilters((prev) => ({
      ...prev,
      year: year,
    }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className="hidden lg:flex"> <Navbar /></div> */}
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
            onPriceChange={handlePriceChange}
            onYearChange={handleYearChange}
          />

          <div className="flex-1 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden px-2 py-1 rounded-lg mb-3 font-medium items-center border gap-3 flex  border-gray-300 hover:bg-gray-50"
              >
                Filter <Filter className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-around gap-4">
                <CarSearch onSearch={handleSearch} />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
              </div>
            ) : error ? (
              <div className="text-center text-red-600">
                Error loading cars: {error.toString()}
              </div>
            ) : (
              <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {cars.map((car: Car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default InventoryPage;

// "use client";
// import React, { useState } from "react";
// import { Fuel, Settings, Calendar, Gauge, X, Filter } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Slider } from "@/components/ui/slider";
// import CarSearch from "@/components/searchCar";
// import { FormDropDown } from "@/components/Dropdown";
// import {
//   useQuery,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// // Create a QueryClient instance
// const queryClient = new QueryClient();

// // Types
// interface Car {
//   _id: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   mileage: number;
//   fuelType: string;
//   transmission: string;
//   images: string[];
//   status?: "New" | "Sold";
// }

// interface PriceRange {
//   min: number;
//   max: number | null;
// }

// interface PresetRange extends PriceRange {
//   id: number;
//   label: string;
// }

// interface CarCardProps {
//   car: Car;
// }

// interface PriceRangeFilterProps {
//   filterType: string;
//   setFilterType: (type: string) => void;
//   customRange: number[];
//   setCustomRange: (range: number[]) => void;
//   selectedPreset: number | null;
//   setSelectedPreset: (id: number) => void;
//   onPriceChange: (range: PriceRange) => void;
// }

// interface FilterPanelProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CarCard: React.FC<CarCardProps> = ({ car }) => {
//   const router = useRouter();

//   const handleViewDetails = () => {
//     router.push(`/inventory/${car._id}`);
//   };

//   return (
//     <div className="bg-white border relative rounded-lg shadow-md overflow-hidden">
//       {car.status && (
//         <span
//           className={`
//             absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold
//             ${
//               car.status === "New"
//                 ? "bg-green-100 text-green-800"
//                 : car.status === "Sold"
//                 ? "bg-red-100 text-red-800"
//                 : "bg-gray-100 text-gray-800"
//             }
//           `}
//         >
//           {car.status}
//         </span>
//       )}

//       <div className="relative h-24 sm:h-40 overflow-hidden">
//         <Image
//           src={
//             Array.isArray(car.images) && car.images.length > 0
//               ? car.images[0]
//               : "/placeholder.jpg"
//           }
//           alt={car.make + car.model}
//           width={250}
//           height={150}
//           className="w-full h-full object-cover"
//           unoptimized={false}
//         />
//       </div>

//       <div className="p-2 sm:p-3">
//         <p className="font-bold text-sm sm:text-md text-left">
//           ₦{car.price.toLocaleString()}
//         </p>

//         <div className="mt-1">
//           <h3 className="font-medium text-xs sm:text-sm truncate">
//             {car.make} {car.model}
//           </h3>
//           <p className="text-xs text-gray-500">{car.year}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-2">
//           <div className="flex items-center gap-1">
//             <Gauge size={14} />
//             <span className="text-xs">{car.mileage} Miles</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Fuel size={14} />
//             <span className="text-xs">{car.fuelType}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Settings size={14} />
//             <span className="text-xs">{car.transmission}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Calendar size={14} />
//             <span className="text-xs">{car.year}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleViewDetails}
//           className="block mt-2 w-full py-1 px-2 border border-gray-300 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition-colors"
//         >
//           View Car Details
//         </button>
//       </div>
//     </div>
//   );
// };

// const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
//   filterType,
//   setFilterType,
//   customRange,
//   setCustomRange,
//   selectedPreset,
//   setSelectedPreset,
//   onPriceChange,
// }) => {
//   const presetRanges: PresetRange[] = [
//     { id: 1, label: "Under $30k", min: 0, max: 30000 },
//     { id: 2, label: "$30k - $50k", min: 30000, max: 50000 },
//     { id: 3, label: "$50k - $80k", min: 50000, max: 80000 },
//     { id: 4, label: "$80k+", min: 80000, max: null },
//   ];

//   const handlePresetClick = (range: PresetRange) => {
//     setSelectedPreset(range.id);
//     onPriceChange({ min: range.min, max: range.max });
//   };

//   const handleCustomRangeChange = (value: number[]) => {
//     setCustomRange(value);
//     onPriceChange({ min: value[0], max: value[1] });
//   };

//   const formatPrice = (price: number) => {
//     return `$${(price / 1000).toFixed(0)}k`;
//   };

//   return (
//     <div>
//       <Tabs defaultValue="preset" onValueChange={setFilterType}>
//         <TabsList className="grid w-fit grid-cols-2 mb-4">
//           <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
//           <TabsTrigger value="custom">Custom Range</TabsTrigger>
//         </TabsList>

//         <TabsContent value="preset">
//           <div className="grid grid-cols-1 gap-2">
//             {presetRanges.map((range) => (
//               <button
//                 key={range.id}
//                 onClick={() => handlePresetClick(range)}
//                 className={`
//                   px-4 py-2 rounded-lg text-xs font-medium
//                   ${
//                     selectedPreset === range.id
//                       ? "bg-red-600 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }
//                   transition-colors
//                 `}
//               >
//                 {range.label}
//               </button>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="custom" className="space-y-4">
//           <div className="pt-6 pb-2">
//             <Slider
//               defaultValue={customRange}
//               max={200000}
//               step={1000}
//               value={customRange}
//               onValueChange={handleCustomRangeChange}
//               className="w-full"
//             />
//           </div>
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>{formatPrice(customRange[0])}</span>
//             <span>{formatPrice(customRange[1])}</span>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
//   const [selectedYear, setSelectedYear] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<PriceRange>({
//     min: 0,
//     max: 600000000,
//   });
//   const [filterType, setFilterType] = useState("preset");
//   const [customRange, setCustomRange] = useState([0, 200000]);
//   const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

//   const years = Array.from({ length: 20 }, (_, i) => ({
//     value: `${2024 - i}`,
//   }));

//   const handlePriceChange = (range: PriceRange) => {
//     setPriceRange(range);
//   };

//   const handleClearFilters = () => {
//     setSelectedYear(null);
//     setPriceRange({ min: 0, max: 200000 });
//     setFilterType("preset");
//     setCustomRange([0, 200000]);
//     setSelectedPreset(null);
//   };

//   return (
//     <div
//       className={`
//       fixed min-w-[230px] lg:static inset-y-0 left-0 z-40 min-From w-12 bg-white border-r transform
//       ${isOpen ? "translate-x-0" : "-translate-x-full"}
//       lg:transform-none lg:translate-x-0
//       transition-transform duration-200 ease-in-out
//       overflow-y-auto
//     `}
//     >
//       <div className="p-3">
//         <div className="flex justify-between items-center lg:hidden mb-3">
//           <h2 className="text-md font-semibold">Filters</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <FormDropDown
//             name="year"
//             options={years}
//             value={selectedYear}
//             onSelect={setSelectedYear}
//             placeholder="Select Year"
//           />

//           <PriceRangeFilter
//             filterType={filterType}
//             setFilterType={setFilterType}
//             customRange={customRange}
//             setCustomRange={setCustomRange}
//             selectedPreset={selectedPreset}
//             setSelectedPreset={setSelectedPreset}
//             onPriceChange={handlePriceChange}
//           />

//           <button
//             onClick={handleClearFilters}
//             className="w-full py-2 px-4 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InventoryPage: React.FC = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     make: null,
//     model: null,
//     year: null,
//     minPrice: null,
//     maxPrice: null,
//     minMileage: null,
//     maxMileage: null,
//   });

//   const {
//     data: cars = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["cars", filters],
//     queryFn: async () => {
//       const params = new URLSearchParams();

//       if (filters.make) params.set("make", filters.make);
//       if (filters.model) params.set("model", filters.model);
//       if (filters.year) params.set("year", filters.year);
//       if (filters.minPrice) params.set("minPrice", filters.minPrice);
//       if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
//       if (filters.minMileage) params.set("minMileage", filters.minMileage);
//       if (filters.maxMileage) params.set("maxMileage", filters.maxMileage);

//       const response = await fetch(`/api/cars?${params.toString()}`);
//       if (!response.ok) throw new Error("Failed to fetch cars");
//       return response.json();
//     },
//     staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
//     gcTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
//   });

//   const handleSearch = ({ make, model }) => {
//     setFilters((prev) => ({
//       ...prev,
//       make,
//       model,
//     }));
//   };

//   const handlePriceChange = (range: PriceRange) => {
//     setFilters((prev) => ({
//       ...prev,
//       minPrice: range.min,
//       maxPrice: range.max,
//     }));
//   };

//   const handleYearChange = (year: string | null) => {
//     setFilters((prev) => ({
//       ...prev,
//       year,
//     }));
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="mx-auto">
//         {isFilterOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//             onClick={() => setIsFilterOpen(false)}
//           />
//         )}

//         <div className="flex flex-col lg:flex-row">
//           <FilterPanel
//             isOpen={isFilterOpen}
//             onClose={() => setIsFilterOpen(false)}
//             onPriceChange={handlePriceChange}
//             onYearChange={handleYearChange}
//           />

//           <div className="flex-1 p-4 sm:p-6">
//             <div className="mb-4 sm:mb-6">
//               <div className="flex items-center justify-around gap-4">
//                 <CarSearch onSearch={handleSearch} />
//                 <button
//                   onClick={() => setIsFilterOpen(true)}
//                   className="lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//                 >
//                   <Filter className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
//               </div>
//             ) : error ? (
//               <div className="text-center text-red-600">
//                 Error loading cars: {error.toString()}
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                 {cars.map((car: Car) => (
//                   <CarCard key={car._id} car={car} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </QueryClientProvider>
//   );
// };

// export default InventoryPage;
