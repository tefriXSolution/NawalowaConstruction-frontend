import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse, User } from "@/types";
import { loginUser, logOutUser } from "../thunks/user.thunk";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: boolean;
  message:string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: false,
  message:"",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        state.user = user ? JSON.parse(user) : null;
        state.token = token;
        state.token = refreshToken;
        state.message=action.payload.message
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOutUser.pending, (state)=>{
        state.loading = true;
        state.error = false;
      })
      .addCase(logOutUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.error = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(logOutUser.rejected, (state)=>{
        state.loading = false;
        state.error = true;
      })
  },
});
export default authSlice.reducer;
