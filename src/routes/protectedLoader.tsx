import { redirect } from "react-router-dom";
import { RootState } from "@/types";
import { store } from "@/redux/store";
import { validateToken } from "@/utils";

export const protectedLoader = (allowedRoles?: string[]) => {
  return async () => {
    const state: RootState = store.getState();
    const { user, refreshToken } = state.auth;
    console.log(`[Route Visit] User: ${user?.email ?? "Guest"}`);

    const isAuthenticated = !validateToken(refreshToken ?? "").error;
    if (!isAuthenticated) {
      return redirect("/login");
    }

    if (allowedRoles && !allowedRoles.includes(user?.role ?? "")) {
      return redirect("/unauthorized");
    }

    return null;
  };
};
