import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const totalCars = await Car.countDocuments();

    return NextResponse.json({ total: totalCars }, { status: 200 });
  } catch (error) {
    console.error("Error counting cars:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
