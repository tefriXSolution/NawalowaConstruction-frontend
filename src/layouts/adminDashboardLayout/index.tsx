import { Footer, NavigationBar } from "@/components";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { FooterLink, NavBarLink } from "@/types";

export const AdminDashboardLayout = () => {

   const navLinks:NavBarLink[]=[
          {
              linkName:"Home",
              linkUrl:"",
          },
          {
              linkName:"Services",
              linkUrl:"",
          },
          {
              linkName:"Equipment Rentals",
              linkUrl:"",
          },
          {
              linkName:"Contact Us",
              linkUrl:"",
          },
      ]
    const footerLinks:FooterLink[]=[
          {
              linkName:"Home",
              linkUrl:"",
          },
          {
              linkName:"Services",
              linkUrl:"",
          },
          {
              linkName:"Equipment Rentals",
              linkUrl:"",
          },
          {
              linkName:"Contact Us",
              linkUrl:"",
          },
      ]

  return (
    <div className="h-full flex flex-col">
      <NavigationBar navLinks={navLinks} />
      <div className="flex flex-1 min-h-screen">
        <SideBar />
        <main className="flex-1 p-6 max-h-screen overflow-scroll">
          <Outlet />
        </main>
      </div>
      <Footer footerLinks={footerLinks} />
    </div>
  );
};
