import { loginService } from "@/services";
import { Credentials, LoginResponse } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk<
    LoginResponse,
    Credentials,
    { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await loginService(credentials.email, credentials.password);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logOutUser = createAsyncThunk<
    LoginResponse,
    Credentials,
    { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await loginService(credentials.email, credentials.password);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});