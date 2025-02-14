import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to Base64 for Cloudinary
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
      folder: "car-inventory",
    });

    return NextResponse.json(
      { imageUrl: uploadResponse.secure_url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
