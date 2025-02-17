import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    // Fetch unique makes from the database
    const makes = await Car.distinct("make");

    // Return the unique makes as a JSON response
    return NextResponse.json(makes, { status: 200 });
  } catch (error) {
    console.error("Error fetching makes:", error);

    // Return an error response
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
