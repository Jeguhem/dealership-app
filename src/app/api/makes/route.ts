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
  } catch (error: unknown) {
    console.error("Error fetching car makes:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch car makes",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
