import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";
import { ICar } from "@/types/car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const {
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      status = "Available",
      images,
      condition, // Added field
      drivetrain, // Added field
      extras, // Added field
    } = await req.json();

    // Ensure images are provided as URLs
    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "Images are required" },
        { status: 400 }
      );
    }

    // Validate drivetrain (optional)
    if (drivetrain && !["4WD", "AWD", "FWD", "RWD"].includes(drivetrain)) {
      return NextResponse.json(
        { error: "Invalid drivetrain type" },
        { status: 400 }
      );
    }

    const newCar: ICar = new Car({
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      status,
      images,
      condition, // Added field
      drivetrain, // Added field
      extras, // Added field
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

// export async function GET(request: NextRequest) {
//   try {
//     await connectMongoDB();
//     const { searchParams } = new URL(request.url);
//     const filters: Record<string, any> = {};

//     // Handle price range
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     if (minPrice || maxPrice) {
//       filters.price = {};
//       if (minPrice) filters.price.$gte = parseInt(minPrice);
//       if (maxPrice) filters.price.$lte = parseInt(maxPrice);
//     }

//     // Handle other filters
//     const make = searchParams.get("make");
//     const model = searchParams.get("model");
//     const year = searchParams.get("year");
//     const minMileage = searchParams.get("minMileage");
//     const maxMileage = searchParams.get("maxMileage");

//     if (make) filters.make = make;
//     if (model) filters.model = model;
//     if (year) filters.year = parseInt(year);

//     // Handle mileage range
//     if (minMileage || maxMileage) {
//       filters.mileage = {};
//       if (minMileage) filters.mileage.$gte = parseInt(minMileage);
//       if (maxMileage) filters.mileage.$lte = parseInt(maxMileage);
//     }

//     const cars = await Car.find(filters)
//       .sort({ createdAt: -1 }) // Optional: sort by newest first
//       .select("-__v"); // Optional: exclude version key

//     return NextResponse.json(cars, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching cars:", error);
//     return NextResponse.json(
//       { error: `Internal Server Error: ${error}` },
//       { status: 500 }
//     );
//   }
// }

// First, define an interface for the price and mileage range filters
interface RangeFilter {
  $gte?: number;
  $lte?: number;
}

// Define the filters interface
interface CarFilters {
  make?: string;
  model?: string;
  year?: number;
  price?: RangeFilter;
  mileage?: RangeFilter;
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const filters: CarFilters = {};

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
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const {
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      status,
      images,
      condition,
      drivetrain,
      extras,
    } = await req.json();

    // Validate images array
    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Validate drivetrain if provided
    if (drivetrain && !["4WD", "AWD", "FWD", "RWD"].includes(drivetrain)) {
      return NextResponse.json(
        { error: "Invalid drivetrain type" },
        { status: 400 }
      );
    }

    // Find and update the car
    const updatedCar = await Car.findByIdAndUpdate(
      params.id,
      {
        make,
        model,
        year,
        price,
        mileage,
        fuelType,
        transmission,
        status,
        images,
        condition,
        drivetrain,
        extras,
      },
      { new: true, runValidators: true } // Returns the updated document and runs schema validators
    );

    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Car updated successfully", car: updatedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE endpoint for image deletion
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { imageUrls } = await req.json();

    // Find the car
    const car = await Car.findById(params.id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Remove specified images
    const updatedImages = car.images.filter(
      (img: string) => !imageUrls.includes(img)
    );

    // Update car with new image array
    const updatedCar = await Car.findByIdAndUpdate(
      params.id,
      { images: updatedImages },
      { new: true }
    );

    return NextResponse.json(
      { message: "Images deleted successfully", car: updatedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting images:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
