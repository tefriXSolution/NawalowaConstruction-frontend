import { Footer, NavigationBar } from "@/components";
import { FooterLink, NavBarLink } from "@/types";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const navLinks: NavBarLink[] = [
    { linkName: "Home", linkUrl: "/" },
    { linkName: "Services", linkUrl: "/services" },
    { linkName: "Equipment Rentals", linkUrl: "/rentals" },
    { linkName: "About Us", linkUrl: "/about" },
    { linkName: "Contact Us", linkUrl: "/contactUs" },
  ];

  const footerLinks: FooterLink[] = [
    { linkName: "Home", linkUrl: "/" },
    { linkName: "Services", linkUrl: "/services" },
    { linkName: "Equipment Rentals", linkUrl: "/rentals" },
    { linkName: "About Us", linkUrl: "/about" },
    { linkName: "Contact Us", linkUrl: "/contactUs" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="relative z-[1000]">
        <NavigationBar navLinks={navLinks} />
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="mt-auto z-[500]">
        <Footer footerLinks={footerLinks} />
      </footer>
    </div>
  );
};
