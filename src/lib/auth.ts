import jwt from "jsonwebtoken";

export async function verifyAuth(token: string) {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "");
    return verified;
  } catch {
    // Remove the error parameter since it's not being used
    return null;
  }
}

// Function to handle setting the auth cookie
export function setAuthCookie(token: string) {
  // Set cookie options and actually use the token
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
    value: token, // Use the token parameter
  };
  return cookieOptions;
}
