import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const carId = params.id;
//     await connectMongoDB();

//     // Validate if the ID is in correct MongoDB format
//     if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
//       return NextResponse.json(
//         { error: "Invalid car ID format" },
//         { status: 400 }
//       );
//     }

//     const car = await Car.findById(carId).select("-__v").lean();

//     if (!car) {
//       return NextResponse.json({ error: "Car not found" }, { status: 404 });
//     }

//     return NextResponse.json(car, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching car:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch car details" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();

    // Validate if the ID is in correct MongoDB format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    const car = await Car.findById(id).select("-__v").lean();

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Failed to fetch car details" },
      { status: 500 }
    );
  }
}

// Optionally, add DELETE method if you need it
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const carId = params.id;

//     if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
//       return NextResponse.json(
//         { error: "Invalid car ID format" },
//         { status: 400 }
//       );
//     }

//     const deletedCar = await Car.findByIdAndDelete(carId);

//     if (!deletedCar) {
//       return NextResponse.json({ error: "Car not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Car deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting car:", error);
//     return NextResponse.json(
//       { error: "Failed to delete car" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}

// Optionally, add PUT method for updating car details
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const updates = await request.json();

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const carId = params.id;
//     const updates = await request.json();

//     // Validate ID format
//     if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
//       return NextResponse.json(
//         { error: "Invalid car ID format" },
//         { status: 400 }
//       );
//     }

//     // Check if updates are provided
//     if (!updates || Object.keys(updates).length === 0) {
//       return NextResponse.json(
//         { error: "No update data provided" },
//         { status: 400 }
//       );
//     }

//     const updatedCar = await Car.findByIdAndUpdate(
//       carId,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).lean();

//     if (!updatedCar) {
//       return NextResponse.json({ error: "Car not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedCar, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating car:", error);

//     // Handle Mongoose validation errors
//     if (error.name === "ValidationError") {
//       return NextResponse.json(
//         { error: "Validation failed", details: error.errors },
//         { status: 400 }
//       );
//     }

//     // Handle other specific Mongoose errors
//     if (error.name === "CastError") {
//       return NextResponse.json(
//         { error: "Invalid data type", details: error.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Failed to update car", details: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const updates = await request.json();

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    // Ensure updates.images is valid
    if (
      !updates.images ||
      !Array.isArray(updates.images) ||
      updates.images.length === 0
    ) {
      return NextResponse.json(
        { error: "No valid images provided for deletion" },
        { status: 400 }
      );
    }

    // Remove images using $pull with $in
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $pull: { images: { $in: updates.images } } },
      { new: true, runValidators: false } // <-- Disable validation here
    ).lean();

    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating car:", error);

    return NextResponse.json(
      {
        error: "Failed to update car images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = params;
//     const updates = await request.json();

//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return NextResponse.json(
//         { error: "Invalid car ID format" },
//         { status: 400 }
//       );
//     }

//     // Ensure updates.images is valid
//     if (
//       !updates.images ||
//       !Array.isArray(updates.images) ||
//       updates.images.length === 0
//     ) {
//       return NextResponse.json(
//         { error: "No valid images provided for deletion" },
//         { status: 400 }
//       );
//     }

//     // Remove images using $pull with $in
//     const updatedCar = await Car.findByIdAndUpdate(
//       id,
//       { $pull: { images: { $in: updates.images } } },
//       { new: true, runValidators: false } // <-- Disable validation here
//     ).lean();

//     if (!updatedCar) {
//       return NextResponse.json({ error: "Car not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedCar, { status: 200 });
//   } catch (error: unknown) {
//     console.error("Error updating car:", error);

//     return NextResponse.json(
//       {
//         error: "Failed to update car images",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
