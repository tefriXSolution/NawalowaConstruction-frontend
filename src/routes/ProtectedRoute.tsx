import { RootState } from "@/types";
import { validateToken } from "@/utils";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { refreshToken, user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !validateToken(refreshToken ?? "").error;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role ?? ""))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};