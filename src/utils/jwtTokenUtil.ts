import jwt from "jsonwebtoken";

export const validateToken = (token: string): { message: string; error: boolean } => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded) {
      return { message: "Invalid token", error: true };
    }

    if (!decoded.exp) {
      return { message: "Token has no expiration time", error: true };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return { message: "Token has expired", error: true };
    }

    return { message: "Token is valid", error: false };
  } catch (err) {
    console.error("Token validation error:", err);
    return { message: "Error while validating token", error: true };
  }
};

export const extractTokenDetails = (token: string): { status: boolean; message: string; data?: { fname: string; lname: string; email: string; role: string } } => {
  try {
    const decoded = jwt.decode(token) as Record<string, any> | null;
    if (!decoded) {
      return { status: false, message: "Invalid token" };
    }
    const { fname, lname, email, role } = decoded;

    if (!fname || !lname || !email || !role) {
      return { status: false, message: "Token missing required user details" };
    }
    return {
      status: true,
      message: "Token decoded successfully",
      data: { fname, lname, email, role }
    };
  } catch (err) {
    console.error("Error extracting token details:", err);
    return { status: false, message: "Error while extracting token details" };
  }
};
