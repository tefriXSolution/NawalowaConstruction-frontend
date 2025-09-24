import { dashboardTheme } from "@/styles";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiHome,
} from "react-icons/hi";
import { LuNotebookText } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";

const sidebarMenu = [
  { label: "Home", href: "/", icon: HiHome },
  { label: "Service Management", href: "/dashboard/service", icon: LuNotebookText },
  { label: "Rental Item Management", href: "/dashboard/rentItem", icon: LuNotebookText },
  { label: "Settings", href: "/dashboard/settings", icon: VscSettingsGear },
  { label: "Log out", href: "/dashboard/logout", icon: IoLogOutOutline },
];

export const SideBar = () => {
  return (
    <Sidebar aria-label="Admin Dashboard Sidebar" theme={dashboardTheme}>
          <SidebarItems>
            <SidebarItemGroup theme={dashboardTheme.itemGroup} className="flex flex-col justify-items-start">
              {sidebarMenu.map((item) =><SidebarItem theme={dashboardTheme.item} key={item.label} href={item.href} icon={item.icon}>
                    {item.label}
                  </SidebarItem>
              )}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
  )
}
