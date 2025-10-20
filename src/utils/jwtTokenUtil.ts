import { updateAccessToken } from '@/redux/slices/user.slice';
import { AppDispatch, RootState } from '@/types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
}

const backendUrl = import.meta.env.VITE_API_BASE_URL;

export const validateToken = (token: string): { message: string; error: boolean } => {
  try {
    if(token === ""){
      return { message: "Token is empty", error: true };
    }

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

export const checkAndRefreshToken = async (
  dispatch: AppDispatch,
  email: string | undefined | null
) => {
  try {
    const token = localStorage.getItem('token');
    if (!token || !email) return; 

    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp - currentTime < 60) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return;

      const response = await axios.post(`${backendUrl}/request-token`, {
        email: email,
        refreshToken: refreshToken
      });

      if (response.data.status) {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('token', newAccessToken);
        dispatch(updateAccessToken(newAccessToken));
        console.log('Access token refreshed');
      }
    }
  } catch (err) {
    console.error('Error checking/refreshing token:', err instanceof Error ? err.message : err);
  }
};
