import { Footer, NavigationBar } from "@/components";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { FooterLink, NavBarLink } from "@/types";
import AuthWatcher from "@/hooks/AuthWatcher";

export const AdminDashboardLayout = () => {

    const navLinks: NavBarLink[] = [
        // {
        //     linkName: "Home",
        //     linkUrl: "/",
        // },
        // {
        //     linkName: "Services",
        //     linkUrl: "/services",
        // },
        // {
        //     linkName: "Equipment Rentals",
        //     linkUrl: "/rentals",
        // },
        // {
        //     linkName: "About Us",
        //     linkUrl: "/about",
        // },
        // {
        //     linkName: "Contacts",
        //     linkUrl: "/contact",
        // }
    ]
    const footerLinks: FooterLink[] = [
        {
            linkName: "Home",
            linkUrl: "/",
        },
        {
            linkName: "Services",
            linkUrl: "/services",
        },
        {
            linkName: "Equipment Rentals",
            linkUrl: "/rentals",
        },
        {
            linkName: "About Us",
            linkUrl: "/about",
        },
        {
            linkName: "Contact Us",
            linkUrl: "/contactUs",
        }
    ]

    return (
        <div className="h-full flex flex-col">
            <AuthWatcher />
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
