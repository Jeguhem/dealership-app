// import Car from "@/models/car";
// import { ICar } from "@/types/car";
// import upload from "@/lib/multer.config";
// import { NextRequest, NextResponse } from "next/server";

// // Helper function to handle multer middleware with Next.js
// const runMiddleware = (req: NextRequest, middleware: any) => {
//   return new Promise((resolve, reject) => {
//     middleware(req, {
//       end: (data: any) => {
//         resolve(data);
//       },
//       setHeader: () => {},
//     }, (err: any) => {
//       if (err) reject(err);
//       resolve(undefined);
//     });
//   });
// };

// export async function POST(request: NextRequest) {
//   try {
//     // Convert NextRequest to Node's Request for multer
//     const nodeReq = new Request(request.url, {
//       method: request.method,
//       headers: request.headers,
//       body: request.body,
//     });

//     // Handle file upload
//     await runMiddleware(nodeReq as any, upload.array('images', 20));

//     // Access the parsed form data
//     const formData = await request.formData();
//     const carData = Object.fromEntries(formData.entries());

//     // Get uploaded files
//     const files = (nodeReq as any).files;
//     const images = files ? files.map((file: any) => file.filename) : [];

//     // Validate required fields
//     if (!carData.name || !carData.year || !carData.price || !carData.mileage) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Create car object with proper typing
//     const carBody: Partial<ICar> = {
//       name: carData.name as string,
//       year: parseInt(carData.year as string),
//       price: parseFloat(carData.price as string),
//       mileage: parseInt(carData.mileage as string),
//       make: carData.make as string,
//       model: carData.model as string,
//       images,
//     };

//     // Create and save the new car
//     const newCar = new Car(carBody);
//     await newCar.save();

//     return NextResponse.json(
//       { message: "Car created successfully", car: newCar },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating car:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//     try {
//       const { searchParams } = new URL(request.url);

//       const filters: Record<string, any> = {};

//       const minPrice = searchParams.get('minPrice');
//       const maxPrice = searchParams.get('maxPrice');
//       const make = searchParams.get('make');
//       const model = searchParams.get('model');
//       const year = searchParams.get('year');

//       if (minPrice || maxPrice) {
//         filters.price = {};
//         if (minPrice) filters.price.$gte = parseInt(minPrice);
//         if (maxPrice) filters.price.$lte = parseInt(maxPrice);
//       }

//       if (make) filters.make = make;
//       if (model) filters.model = model;
//       if (year) filters.year = parseInt(year);

//       const cars = await Car.find(filters)

//       return NextResponse.json(cars, { status: 200 });
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
//   }

import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";
import { ICar } from "@/types/car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const {
      name,
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      status,
      images,
    } = await req.json();

    // Ensure images are provided as URLs
    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "Images are required" },
        { status: 400 }
      );
    }

    const newCar = new Car({
      name,
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      status,
      images, // Store Cloudinary URLs in MongoDB
    });

    await newCar.save();

    return NextResponse.json(
      { message: "Car created successfully", car: newCar },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: Record<string, any> = {};

    // Handle price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseInt(minPrice);
      if (maxPrice) filters.price.$lte = parseInt(maxPrice);
    }

    // Handle other filters
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const minMileage = searchParams.get("minMileage");
    const maxMileage = searchParams.get("maxMileage");

    if (make) filters.make = make;
    if (model) filters.model = model;
    if (year) filters.year = parseInt(year);

    // Handle mileage range
    if (minMileage || maxMileage) {
      filters.mileage = {};
      if (minMileage) filters.mileage.$gte = parseInt(minMileage);
      if (maxMileage) filters.mileage.$lte = parseInt(maxMileage);
    }

    const cars = await Car.find(filters)
      .sort({ createdAt: -1 }) // Optional: sort by newest first
      .select("-__v"); // Optional: exclude version key

    return NextResponse.json(cars, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
