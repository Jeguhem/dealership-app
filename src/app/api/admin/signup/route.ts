import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/admin";

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    try {
      // Get the request body
      const requestBodyText = await request.text();
      console.log(requestBodyText);
      const requestBody = JSON.parse(requestBodyText);

      // Check if email and password are provided
      if (!requestBody.email || !requestBody.password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: requestBody.email });
      if (existingAdmin) {
        return NextResponse.json(
          { error: "Admin already exists" },
          { status: 400 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(requestBody.password, 10);

      // Create a new admin
      const admin = await Admin.create({
        email: requestBody.email,
        password: hashedPassword,
      });

      // Return a success response
      return NextResponse.json(
        { message: "Admin created successfully", admin },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}