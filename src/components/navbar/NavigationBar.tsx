import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "@/assets/img/logo.png";
import { navbarStyle } from "@/styles";
import { NavBarLink } from "@/types";
import { useLocation, useNavigate } from "react-router";

interface Props {
  navLinks: NavBarLink[];
}

const NavigationBar = ({ navLinks }: Props) => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <Navbar
      fluid
      theme={navbarStyle}
      className="!bg-mainTheme-color relative z-[1000] px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <NavbarBrand
        href="/"
        className="flex items-center gap-2 sm:gap-3 md:gap-4"
      >
        <img
          src={Logo}
          className="h-8 sm:h-10 md:h-12 lg:h-14 transition-transform duration-300 scale-110 hover:scale-125"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-lg sm:text-xl md:text-2xl font-semibold text-mainText-color italic">
          NawalowaConstruction
        </span>
      </NavbarBrand>

      <div className="flex items-center gap-2 md:gap-4 md:order-2">
        <Button
          className="hidden md:inline-block !bg-gray-300 text-mainTheme-color text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <NavbarToggle />
      </div>

      <NavbarCollapse className="absolute top-full left-0 w-full bg-mainTheme-color shadow-lg md:static md:shadow-none md:w-auto">
        {navLinks.map((navLink) => (
          <NavbarLink
            key={navLink.linkUrl}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(navLink.linkUrl ?? "/");
              if (navLink.onClick) navLink.onClick();
            }}
            className={`block w-full text-base sm:text-lg md:text-base lg:text-lg px-4 md:px-2 lg:px-4 py-2 md:py-0 text-center md:text-left transition-colors duration-200 ${
              currentPath === navLink.linkUrl
                ? "!text-mainText-color md:scale-110 bg-mainSidebar-link-hover-color"
                : "hover:bg-mainSidebar-link-hover-color"
            }`}
          >
            {navLink.linkName}
          </NavbarLink>
        ))}

        <div className="md:hidden mt-2 px-4 mb-10">
          <Button
            className="w-full !bg-gray-300 text-mainTheme-color text-base py-2 transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavigationBar;
