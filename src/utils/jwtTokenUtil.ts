import { updateAccessToken } from '@/redux/slices/user.slice';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';
// FIX: The 'jwt-decode' library (v3+) uses a named export 'jwtDecode' instead of a default export.
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

// It's good practice to define a type for your decoded token payload
// to get better type safety and autocompletion.
interface DecodedToken {
  exp: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  // Add any other properties you expect in the token
}

export const validateToken = (token: string): { message: string; error: boolean } => {
  try {
    // FIX: Call the imported function correctly.
    const decoded = jwtDecode<DecodedToken>(token);

    if (!decoded.exp) {
      return { message: "Token has no expiration time", error: true };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return { message: "Token has expired", error: true };
    }

    return { message: "Token is valid", error: false };
  } catch (err) {
    // It's helpful to log the specific error for debugging.
    console.error("Token validation error:", err instanceof Error ? err.message : err);
    return { message: "Error while validating token", error: true };
  }
};

export const extractTokenDetails = (token: string): {
  status: boolean;
  message: string;
  data?: { fname: string; lname: string; email: string; role: string }
} => {
  try {
    // FIX: Call the imported function correctly and use our defined type.
    const decoded = jwtDecode<DecodedToken>(token);

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
    console.error("Error extracting token details:", err instanceof Error ? err.message : err);
    return { status: false, message: "Error while extracting token details" };
  }
};

const backendUrl = import.meta.env.VITE_API_BASE_URL;

export const checkAndRefreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    const user = useSelector((state:any) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp - currentTime < 60) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return;

      const response = await axios.post(`${backendUrl}/request-token`, { email: user.email, refreshToken:refreshToken });

      if (response.data.status) {
        localStorage.setItem('token', response.data.accessToken);
        dispatch(updateAccessToken(response.data.accessToken))
        console.log('Access token refreshed');
      }
    }
  } catch (err) {
    console.error('Error checking/refreshing token:', err instanceof Error ? err.message : err);
  }
};
