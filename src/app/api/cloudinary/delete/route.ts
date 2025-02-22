// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     // Check if Cloudinary credentials are configured
//     if (
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET ||
//       !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//     ) {
//       return NextResponse.json(
//         { error: "Cloudinary configuration is missing" },
//         { status: 500 }
//       );
//     }

//     const { public_id } = await req.json();

//     if (!public_id) {
//       return NextResponse.json(
//         { error: "Public ID is required" },
//         { status: 400 }
//       );
//     }

//     // Create timestamp and signature
//     const timestamp = Math.round(new Date().getTime() / 1000);
//     const signature = await generateSignature(public_id, timestamp);

//     // Use URLSearchParams instead of FormData
//     const params = new URLSearchParams();
//     params.append("public_id", public_id);
//     params.append("signature", signature);
//     params.append("api_key", process.env.CLOUDINARY_API_KEY!);
//     params.append("timestamp", timestamp.toString());

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: params,
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Cloudinary API error:", errorData);
//       return NextResponse.json(
//         {
//           error: `Failed to delete image: ${
//             errorData.error?.message || "Unknown error"
//           }`,
//         },
//         { status: 500 }
//       );
//     }

//     const result = await response.json();

//     if (result.result === "ok") {
//       return NextResponse.json(
//         { message: "Image deleted successfully" },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { error: "Failed to delete image" },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Error deleting image from Cloudinary:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // Helper function to generate signature
// async function generateSignature(
//   publicId: string,
//   timestamp: number
// ): Promise<string> {
//   const str = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
//   const msgBuffer = new TextEncoder().encode(str);
//   // Change to SHA-256
//   const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
//   return hashHex;
// }

// // Helper function to extract public_id from Cloudinary URL
// export function getPublicIdFromUrl(url: string): string {
//   try {
//     // Extract the filename without extension from the URL
//     const matches = url.match(/\/v\d+\/([^/]+)\./);
//     if (matches && matches[1]) {
//       return matches[1];
//     }
//     return "";
//   } catch (error) {
//     console.error("Error extracting public_id from URL:", error);
//     return "";
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary credentials are configured
    if (
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    // Get public_id from request body
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Create timestamp and signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await generateSignature(public_id, timestamp);

    // Create body parameters
    const params = new URLSearchParams();
    params.append("public_id", public_id);
    params.append("signature", signature);
    params.append("api_key", process.env.CLOUDINARY_API_KEY);
    params.append("timestamp", timestamp.toString());

    // Delete the image using Cloudinary REST API
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary API error:", result);
      return NextResponse.json(
        { error: result.error?.message || "Failed to delete image" },
        { status: response.status }
      );
    }

    if (result.result === "ok") {
      return NextResponse.json(
        { message: "Image deleted successfully" },
        { status: 200 }
      );
    } else {
      console.error("Cloudinary deletion failed:", result);
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// Helper function to generate signature
async function generateSignature(
  publicId: string,
  timestamp: number
): Promise<string> {
  // The string to sign should include all parameters in alphabetical order
  const str = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

  // Use Web Crypto API for generating SHA-256 hash
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

// Helper function to extract public_id from Cloudinary URL (if needed)
function getPublicIdFromUrl(url: string): string {
  try {
    const matches = url.match(/\/v\d+\/([^/]+)\./);
    return matches && matches[1] ? matches[1] : "";
  } catch (error) {
    console.error("Error extracting public_id from URL:", error);
    return "";
  }
}
