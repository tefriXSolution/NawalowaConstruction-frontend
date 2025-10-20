import { createBrowserRouter } from "react-router-dom";
import { MainLayout, AdminDashboardLayout } from "@/layouts";
import { mainRoutes } from "./mainRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { NotFoundPage } from "@/pages";
import { protectedLoader } from "./protectedLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: mainRoutes, 
  },
  {
    path: "/dashboard",
    Component: AdminDashboardLayout,
    children: dashboardRoutes,
    loader: protectedLoader(["ADMIN", "SUPERADMIN"]),
  },
  { path: "*", Component: NotFoundPage },
]);
