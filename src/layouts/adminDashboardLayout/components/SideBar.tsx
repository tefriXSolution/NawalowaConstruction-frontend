import { dashboardTheme } from "@/styles";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiHome, HiMenu } from "react-icons/hi";
import { VscSettingsGear } from "react-icons/vsc";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import { FaTools, FaEnvelope } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/types";
import { logOutUser } from "@/redux/thunks/user.thunk";
import { persistor } from "@/redux/store";
import { useState } from "react";

const sidebarMenu = [
  { label: "Dashboard", href: "/dashboard", icon: HiHome },
  { label: "Service Management", href: "/dashboard/service-manage", icon: FaTools },
  { label: "Contacts", href: "/dashboard/contacts", icon: FaEnvelope },
  { label: "Rental Item Management", href: "/dashboard/product-manage", icon: MdInventory2 },
  { label: "Settings", href: "/dashboard/settings", icon: VscSettingsGear },
  { label: "Log out", href: "/", icon: IoLogOutOutline },
];

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(logOutUser({ email: user?.email ?? "" }));
    persistor.purge();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        aria-label="Open menu"
        className="fixed left-4 top-14 z-[60] rounded-lg bg-mainTheme-color p-2 text-white shadow md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <HiMenu className="h-6 w-6" />
      </button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar container: drawer on mobile, static on md+ */}
      <div
        className={`fixed z-50 h-full transform transition-transform duration-200 md:static md:z-auto md:transform-none ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <Sidebar aria-label="Admin Dashboard Sidebar" theme={dashboardTheme}>
          {/* Mobile header with close */}
          <div className="flex items-center justify-between md:hidden">
            <span className="px-16 py-2 text-base font-semibold text-mainTheme-color">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              className="rounded p-2 text-mainTheme-color hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          <SidebarItems>
            <SidebarItemGroup
              theme={dashboardTheme.itemGroup}
              className="flex flex-col justify-items-start"
            >
              {sidebarMenu.map((item) => {
                const isLogout = item.label === "Log out";
                const isActive = location.pathname === item.href;

                const iconColor = isLogout
                  ? "text-white"
                  : isActive
                    ? "text-mainSidebar-color"
                    : "text-mainSidebar-link-hover-color group-hover:text-mainSidebar-linkText-hover-color";

                const itemClass = `cursor-pointer ${isActive && !isLogout
                    ? "!bg-mainSidebar-link-hover-color !text-mainSidebar-color font-semibold"
                    : ""
                  } ${isLogout
                    ? "!bg-red-600 !text-white hover:!bg-red-700 focus:!ring-2 focus:!ring-red-300"
                    : ""
                  }`;

                return (
                  <SidebarItem
                    key={item.label}
                    theme={dashboardTheme.item}
                    icon={() => (
                      <item.icon className={`h-6 w-6 transition duration-75 ${iconColor}`} />
                    )}
                    onClick={
                      isLogout
                        ? () => {
                          handleSignOut();
                          setMobileOpen(false);
                        }
                        : () => {
                          navigate(item.href);
                          setMobileOpen(false);
                        }
                    }
                    className={itemClass}
                  >
                    {item.label}
                  </SidebarItem>
                );
              })}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </>
  );
};
