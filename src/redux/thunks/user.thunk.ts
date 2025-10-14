import { loginService, logOutService } from "@/services";
import { Credentials, LoginResponse, LogOutResponse } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk<
    LoginResponse,
    Credentials,
    { rejectValue: LoginResponse }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await loginService(credentials.email, credentials.password);
    if (response.error) {
      console.log(response)
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.response?.data || "");
  }
});

export const logOutUser = createAsyncThunk<
  LogOutResponse,
  { email: string },
  { rejectValue: string }
>(
  "auth/logOutUser",
  async (payload, thunkAPI) => {
    try {
      const response = await logOutService(payload.email);
      if (response.error) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
