import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/admin";

export async function POST(reqt: NextRequest) {
  try {
    console.log("started")
    const { email, password } = await request.json();
    console.log(email,password)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Admin created successfully", admin },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in admin signup:", error);
    return NextResponse.json(
      { error: "Error creating admin" },
      { status: 500 }
    );
  }
}