// "use client";

// import { useState } from "react";
// import {
//   CldUploadWidget,
//   CloudinaryUploadWidgetResults,
// } from "next-cloudinary";
// import Image from "next/image";

// export default function UploadCar() {
//   const [carData, setCarData] = useState({
//     name: "",
//     make: "",
//     model: "",
//     year: "",
//     price: "",
//     mileage: "",
//     fuelType: "",
//     transmission: "",
//     status: "",
//     images: [],
//   });

//   const [imageUrls, setImageUrls] = useState<string[]>([]);

//   const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
//     if (result.event === "success") {
//       setImageUrls((prev) => [...prev, result.info.secure_url]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("/api/cars", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...carData, images: imageUrls }),
//     });

//     if (response.ok) {
//       alert("Car added successfully!");
//     } else {
//       alert("Failed to add car");
//     }
//   };

//   return (
//     <div>
//       <h2>Add a New Car</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           onChange={(e) => setCarData({ ...carData, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Make"
//           onChange={(e) => setCarData({ ...carData, make: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Model"
//           onChange={(e) => setCarData({ ...carData, model: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Year"
//           onChange={(e) => setCarData({ ...carData, year: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           onChange={(e) => setCarData({ ...carData, price: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Mileage"
//           onChange={(e) => setCarData({ ...carData, mileage: e.target.value })}
//         />
//         <select
//           onChange={(e) => setCarData({ ...carData, fuelType: e.target.value })}
//         >
//           <option value="Petrol">Petrol</option>
//           <option value="Diesel">Diesel</option>
//           <option value="Electric">Electric</option>
//           <option value="Hybrid">Hybrid</option>
//         </select>
//         <select
//           onChange={(e) =>
//             setCarData({ ...carData, transmission: e.target.value })
//           }
//         >
//           <option value="Automatic">Automatic</option>
//           <option value="Manual">Manual</option>
//         </select>

//         {/* Cloudinary Upload Widget */}
//         <CldUploadWidget
//           uploadPreset="your_upload_preset"
//           onUpload={handleImageUpload}
//         >
//           {({ open }) => (
//             <button type="button" onClick={() => open()}>
//               Upload Images
//             </button>
//           )}
//         </CldUploadWidget>

//         {/* Show uploaded images */}
//         <div>
//           {imageUrls.map((url, index) => (
//             <Image key={index} src={url} alt="Car" width="100" />
//           ))}
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";

interface CarData {
  name: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  status: string;
  images: string[];
}

export default function UploadCar() {
  const [carData, setCarData] = useState<CarData>({
    name: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    status: "",
    images: [],
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      result.info &&
      typeof result.info === "object"
    ) {
      const info = result.info as CloudinaryUploadWidgetInfo;
      if ("secure_url" in info) {
        setImageUrls((prev) => [...prev, info.secure_url]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...carData, images: imageUrls }),
    });

    if (response.ok) {
      alert("Car added successfully!");
    } else {
      alert("Failed to add car");
    }
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={carData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Make"
          value={carData.make}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, make: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Model"
          value={carData.model}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, model: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Year"
          value={carData.year}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, year: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={carData.price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Mileage"
          value={carData.mileage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCarData({ ...carData, mileage: e.target.value })
          }
        />
        <select
          value={carData.fuelType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCarData({ ...carData, fuelType: e.target.value })
          }
        >
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={carData.transmission}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCarData({ ...carData, transmission: e.target.value })
          }
        >
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        {/* Cloudinary Upload Widget */}
        <CldUploadWidget
          uploadPreset="your_upload_preset"
          onUpload={handleImageUpload}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()}>
              Upload Images
            </button>
          )}
        </CldUploadWidget>

        {/* Show uploaded images */}
        <div>
          {imageUrls.map((url, index) => (
            <Image key={index} src={url} alt="Car" width="100" />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
