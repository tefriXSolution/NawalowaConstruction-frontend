import { Footer, NavigationBar } from "@/components";
import { FooterLink, NavBarLink } from "@/types";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    const navLinks:NavBarLink[] = [
        {
            linkName:"Home",
            linkUrl:"/",
        },
        {
            linkName:"Services",
            linkUrl:"/services",
        },
        {
            linkName:"Equipment Rentals",
            linkUrl:"/rentals",
        },
        {
            linkName:"About Us",
            linkUrl:"/about",
        },
        {
            linkName:"Contact Us",
            linkUrl:"/contactUs",
        }
    ]
    const footerLinks:FooterLink[]=[
        {
            linkName:"Home",
            linkUrl:"/",
        },
        {
            linkName:"Services",
            linkUrl:"/services",
        },
        {
            linkName:"Equipment Rentals",
            linkUrl:"/rentals",
        },
        {
            linkName:"About Us",
            linkUrl:"/about",
        },
        {
            linkName:"Contact Us",
            linkUrl:"/contactUs",
        }
    ]
  return (
    <div className="h-full flex flex-col">
      <NavigationBar navLinks={navLinks} />
      <div className="flex flex-1 min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer footerLinks={footerLinks} />
    </div>
  );
};
