import { NavigationBar } from "@/components";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router";

export const AdminDashboardLayout = () => {
  return (
    <div className="h-full flex flex-col">
      <NavigationBar navLinks={[]} />
      <div className="flex flex-1 min-h-screen">
        <SideBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
