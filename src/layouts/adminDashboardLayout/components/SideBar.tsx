import { dashboardTheme } from "@/styles";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { LuNotebookText } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router";

const sidebarMenu = [
  { label: "Home", href: "/", icon: HiHome },
  { label: "Service Management", href: "/dashboard/service-manage", icon: LuNotebookText },
  { label: "Rental Item Management", href: "/dashboard/product-manage", icon: LuNotebookText },
  { label: "Settings", href: "/dashboard/settings", icon: VscSettingsGear },
  { label: "Log out", href: "/dashboard/logout", icon: IoLogOutOutline },
];

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar aria-label="Admin Dashboard Sidebar" theme={dashboardTheme}>
      <SidebarItems>
        <SidebarItemGroup
          theme={dashboardTheme.itemGroup}
          className="flex flex-col justify-items-start"
        >
          {sidebarMenu.map((item) => (
            <SidebarItem
              key={item.label}
              theme={dashboardTheme.item}
              icon={() => (
                <item.icon
                  className={`h-6 w-6 transition duration-75 ${
                    location.pathname === item.href
                      ? "text-mainSidebar-color"
                      : "text-mainSidebar-link-hover-color group-hover:text-mainSidebar-linkText-hover-color"
                  }`}
                />
              )}
              onClick={() => navigate(item.href)}
              className={`cursor-pointer ${
                location.pathname === item.href
                  ? "!bg-mainSidebar-link-hover-color !text-mainSidebar-color font-semibold"
                  : ""
              }`}
            >
              {item.label}
            </SidebarItem>

          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
