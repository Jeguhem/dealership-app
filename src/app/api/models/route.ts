import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");

    if (!make) {
      return NextResponse.json(
        { message: "Make is required" },
        { status: 400 }
      );
    }

    const models = await Car.distinct("model", { make });

    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("Error fetching models:", error);

    // Return an error response
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
