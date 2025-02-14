// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { X, AlertCircle } from 'lucide-react';
// import search from '@/public/image/search.svg'
// import audi from "@/public/image/audi.svg";
// import car_logo from "@/public/image/car-logo.svg";
// import Image from 'next/image';

// // Sample data for manufacturers (removed logos since we're not using them in dropdown)
// const manufacturers = [
//   { id: 'toyota', name: 'Toyota' },
//   { id: 'honda', name: 'Honda' },
//   { id: 'ford', name: 'Ford' },
//   { id: 'bmw', name: 'BMW' },
//   { id: 'mercedes', name: 'Mercedes-Benz' },
  
// ];

// const modelsByManufacturer = {
//   toyota: [
//     { id: 'camry', name: 'Camry' },
//     { id: 'corolla', name: 'Corolla' },
//     { id: 'rav4', name: 'RAV4' },
//   ],
//   honda: [
//     { id: 'civic', name: 'Civic' },
//     { id: 'accord', name: 'Accord' },
//     { id: 'crv', name: 'CR-V' },
//   ],
//   ford: [
//     { id: 'f150', name: 'F-150' },
//     { id: 'mustang', name: 'Mustang' },
//     { id: 'escape', name: 'Escape' },
//   ],
//   bmw: [
//     { id: '3series', name: '3 Series' },
//     { id: '5series', name: '5 Series' },
//     { id: 'x5', name: 'X5' },
//   ],
//   mercedes: [
//     { id: 'cclass', name: 'C-Class' },
//     { id: 'eclass', name: 'E-Class' },
//     { id: 'gclass', name: 'G-Class' },
//   ],
// };

// const useClickOutside = (ref, handler) => {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }
//       handler(event);
//     };

//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);

//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// };

// const Combobox = ({ 
//   value, 
//   onChange, 
//   options, 
//   placeholder,
//   disabled = false,
//   errorMessage = '',
//   onClear,
//   isModel = false
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [query, setQuery] = useState('');
//   const [showError, setShowError] = useState(false);
//   const comboboxRef = useRef(null);
//   const [highlightedIndex, setHighlightedIndex] = useState(0);

//   useClickOutside(comboboxRef, () => {
//     setIsOpen(false);
//     setShowError(false);
//   });

//   const filteredOptions = query === ''
//     ? options
//     : options.filter((option) => 
//         option.name.toLowerCase().includes(query.toLowerCase())
//       );

//   const handleKeyDown = (e) => {
//     if (disabled) return;

//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setIsOpen(true);
//         setHighlightedIndex((prev) => 
//           prev < filteredOptions.length - 1 ? prev + 1 : 0
//         );
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         setIsOpen(true);
//         setHighlightedIndex((prev) => 
//           prev > 0 ? prev - 1 : filteredOptions.length - 1
//         );
//         break;
//       case 'Enter':
//         e.preventDefault();
//         if (isOpen && filteredOptions[highlightedIndex]) {
//           selectOption(filteredOptions[highlightedIndex]);
//         } else {
//           setIsOpen(true);
//         }
//         break;
//       case 'Escape':
//         e.preventDefault();
//         setIsOpen(false);
//         break;
//     }
//   };

//   const selectOption = (option) => {
//     onChange(option);
//     setQuery(option.name);
//     setIsOpen(false);
//     setShowError(false);
//   };

//   const handleInputClick = () => {
//     if (disabled) {
//       setShowError(true);
//       return;
//     }
//     setIsOpen(true);
//     setShowError(false);
//   };

//   return (
//     <div className="relative" ref={comboboxRef}>
//       <div className={`
//         flex items-center gap-7 p-2 rounded-lg
//         ${disabled ? 'bg-gray-50' : 'bg-gray-100'}
//         ${showError ? 'border border-red-300' : ''}
//       `}>
//         {/* Default logo for manufacturer or car icon for model */}
//         {!isModel ? (
//           <Image
//             src={audi}
//             alt=""
//             width={32}
//             height={32}
//           />
//         ) : (
//             <Image
//             src={car_logo}
//             alt=""
//             width={20}
//             height={20}
//           />
//         )}
//         <input
//           type="text"
//           className={`
//             w-full min-w-[250px] bg-transparent border-none focus:outline-none
//             ${disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-700'}
//           `}
//           placeholder={placeholder}
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setIsOpen(true);
//           }}
//           onClick={handleInputClick}
//           onKeyDown={handleKeyDown}
//           disabled={disabled}
//         />
//         {value && onClear && (
//           <button
//             onClick={() => {
//               onClear();
//               setQuery('');
//             }}
//             className="p-1 hover:bg-gray-200 rounded-full"
//           >
//             <X className="w-4 h-4 text-gray-500" />
//           </button>
//         )}
//       </div>

//       {showError && errorMessage && (
//         <div className="absolute mt-1 text-sm text-red-500 flex items-center gap-1">
//           <AlertCircle className="w-4 h-4" />
//           {errorMessage}
//         </div>
//       )}

// {isOpen && filteredOptions.length > 0 && (
//   <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
//     <ul className="py-1 max-h-60 overflow-y-auto">
//       {filteredOptions.map((option, index) => (
//         <li
//           key={option.id}
//           className={`
//             px-3 py-2 cursor-pointer
//             ${index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'}
//           `}
//           onClick={() => selectOption(option)}
//         >
//           <span>{option.name}</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//     </div>
//   );
// };

// const CarSearch = () => {
//   const [selectedManufacturer, setSelectedManufacturer] = useState(null);
//   const [selectedModel, setSelectedModel] = useState(null);

//   const handleManufacturerChange = (manufacturer) => {
//     setSelectedManufacturer(manufacturer);
//     setSelectedModel(null);
//   };

//   return (
//     <div className="flex items-center gap-4 justify-center ">
//       <div className=" flex  px-5 gap-7 items-center bg-gray-50 p-2 rounded-lg">
//         <Combobox
//           value={selectedManufacturer}
//           onChange={handleManufacturerChange}
//           options={manufacturers}
//           placeholder="e.g Audi"  // Default manufacturer name
//           onClear={() => {
//             setSelectedManufacturer(null);
//             setSelectedModel(null);
//           }}
//         />
//         <Combobox
//           value={selectedModel}
//           onChange={setSelectedModel}
//           options={selectedManufacturer ? modelsByManufacturer[selectedManufacturer.id] : []}
//           placeholder="e.g Camry"  // Example model name as placeholder
//           disabled={!selectedManufacturer}
//           errorMessage="Please select a manufacturer first"
//           onClear={() => setSelectedModel(null)}
//           isModel={true}
//         />
        
//       </div>
//       <button className="w-fit flex items-center gap-2 px-8 py-3 rounded-full text-white text-md font-medium 
//         bg-gradient-to-br from-red-600 via-red-700 to-gray-900 
//         hover:from-red-700 hover:via-red-800 hover:to-gray-950 
//         transition-all duration-300">
//         Find Car
//         <Image src={search} alt="" width={32} height={32} />
//       </button>
//     </div>
//   );
// };

// export default CarSearch;




'use client'
import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import search from '@/public/image/search.svg'
import audi from "@/public/image/audi.svg";
import car_logo from "@/public/image/car-logo.svg";
import Image from 'next/image';

// Sample data for manufacturers (removed logos since we're not using them in dropdown)
const manufacturers = [
  { id: 'toyota', name: 'Toyota' },
  { id: 'honda', name: 'Honda' },
  { id: 'ford', name: 'Ford' },
  { id: 'bmw', name: 'BMW' },
  { id: 'mercedes', name: 'Mercedes-Benz' },
  
];

const modelsByManufacturer = {
  toyota: [
    { id: 'camry', name: 'Camry' },
    { id: 'corolla', name: 'Corolla' },
    { id: 'rav4', name: 'RAV4' },
  ],
  honda: [
    { id: 'civic', name: 'Civic' },
    { id: 'accord', name: 'Accord' },
    { id: 'crv', name: 'CR-V' },
  ],
  ford: [
    { id: 'f150', name: 'F-150' },
    { id: 'mustang', name: 'Mustang' },
    { id: 'escape', name: 'Escape' },
  ],
  bmw: [
    { id: '3series', name: '3 Series' },
    { id: '5series', name: '5 Series' },
    { id: 'x5', name: 'X5' },
  ],
  mercedes: [
    { id: 'cclass', name: 'C-Class' },
    { id: 'eclass', name: 'E-Class' },
    { id: 'gclass', name: 'G-Class' },
  ],
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Combobox = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  disabled = false,
  errorMessage = '',
  onClear,
  isModel = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showError, setShowError] = useState(false);
  const comboboxRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useClickOutside(comboboxRef, () => {
    setIsOpen(false);
    setShowError(false);
  });

  const filteredOptions = query === ''
    ? options
    : options.filter((option) => 
        option.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const selectOption = (option) => {
    onChange(option);
    setQuery(option.name);
    setIsOpen(false);
    setShowError(false);
  };

  const handleInputClick = () => {
    if (disabled) {
      setShowError(true);
      return;
    }
    setIsOpen(true);
    setShowError(false);
  };

  return (
    <div className="relative" ref={comboboxRef}>
      <div className={`
        flex items-center gap-3 p-1 rounded-lg
        ${disabled ? 'bg-gray-50' : 'bg-gray-100'}
        ${showError ? 'border border-red-300' : ''}
      `}>
        {/* Default logo for manufacturer or car icon for model */}
        {!isModel ? (
          <Image
            src={audi}
            alt=""
            width={24}
            height={24}
          />
        ) : (
            <Image
            src={car_logo}
            alt=""
            width={16}
            height={16}
          />
        )}
        <input
          type="text"
          className={`
            w-full min-w-[150px] bg-transparent border-none focus:outline-none
            ${disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-700'}
          `}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {value && onClear && (
          <button
            onClick={() => {
              onClear();
              setQuery('');
            }}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        )}
      </div>

      {showError && errorMessage && (
        <div className="absolute mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errorMessage}
        </div>
      )}

{isOpen && filteredOptions.length > 0 && (
  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
    <ul className="py-1 max-h-60 overflow-y-auto">
      {filteredOptions.map((option, index) => (
        <li
          key={option.id}
          className={`
            px-2 py-1 cursor-pointer text-sm
            ${index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'}
          `}
          onClick={() => selectOption(option)}
        >
          <span>{option.name}</span>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

const CarSearch = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleManufacturerChange = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setSelectedModel(null);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 justify-center">
      <div className="flex px-3 gap-3 items-center bg-gray-50 p-1 rounded-lg">
        <Combobox
          value={selectedManufacturer}
          onChange={handleManufacturerChange}
          options={manufacturers}
          placeholder="e.g Audi"  // Default manufacturer name
          onClear={() => {
            setSelectedManufacturer(null);
            setSelectedModel(null);
          }}
        />
        <Combobox
          value={selectedModel}
          onChange={setSelectedModel}
          options={selectedManufacturer ? modelsByManufacturer[selectedManufacturer.id] : []}
          placeholder="e.g Camry"  // Example model name as placeholder
          disabled={!selectedManufacturer}
          errorMessage="Please select a manufacturer first"
          onClear={() => setSelectedModel(null)}
          isModel={true}
        />
        
      </div>
      <button className="w-fit flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm font-medium 
        bg-gradient-to-br from-red-600 via-red-700 to-gray-900 
        hover:from-red-700 hover:via-red-800 hover:to-gray-950 
        transition-all duration-300">
        Find Car
        <Image src={search} alt="" width={20} height={20} />
      </button>
    </div>
  );
};

export default CarSearch;