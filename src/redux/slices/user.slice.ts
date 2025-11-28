import { createSlice } from "@reduxjs/toolkit";
import { ContactInfo, User } from "@/types";
import { loginUser, logOutUser, fetchContactInfo } from "../thunks/user.thunk";

interface AuthState {
  user: User | null;
  contactInfo?: ContactInfo;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.token = action.payload
    },
    updateUserData: (state, action) => {
      state.user = action.payload
    },
    updateContactInfo: (state, action) => {
      state.contactInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;

        state.user = action.payload.data?.user ?? null;
        state.token = action.payload.data?.token ?? null;
        state.refreshToken = action.payload.data?.refreshToken ?? null;
        state.message = action.payload.message;

        if (action.payload.data?.user && action.payload.data?.token) {
          localStorage.setItem("user", JSON.stringify(action.payload.data?.user));
          localStorage.setItem("token", action.payload.data?.token);
          if (action.payload.data?.refreshToken) {
            localStorage.setItem("refreshToken", action.payload.data?.refreshToken);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Login failed";
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload;
      });
  },
});

export const { updateAccessToken, updateUserData, updateContactInfo } = authSlice.actions;
export default authSlice.reducer;
