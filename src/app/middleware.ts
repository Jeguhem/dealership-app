import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

// Add the config to match admin routes
export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const verifiedToken = await verifyAuth(token);

    // You can add additional admin role checking here if needed
    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
