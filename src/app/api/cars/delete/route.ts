// app/api/cars/delete/route.ts
import { NextResponse } from "next/server";
import Car from "@/models/car";
import connectMongoDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { id } = body;

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid car ID provided" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongoDB();

    // Find and delete the car
    const deletedCar = await Car.findByIdAndDelete(id);

    // If no car was found with that ID
    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Car deleted successfully",
        deletedCar,
      },
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

// Optional: Add middleware to verify authentication
// You would need to wrap the handler with your auth middleware
// export { auth } from '@/middleware/auth'
