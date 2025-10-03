import { createBrowserRouter } from "react-router-dom";
import {
  AdminDashboardLayout, 
  MainLayout
} from '@/layouts/index'
import { dashboardRoutes } from "./dashboardRoutes";
import { mainRoutes } from "./mainRoutes";

export const router = createBrowserRouter([
  { path: "/", Component: MainLayout,
    children:mainRoutes
   },
  { path: "dashboard", Component: AdminDashboardLayout,
    children:dashboardRoutes
   },
]);
