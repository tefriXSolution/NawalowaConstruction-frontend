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
    <Navbar fluid theme={navbarStyle} className="!bg-mainTheme-color">
      <NavbarBrand href="/">
        <img
          src={Logo}
          className="mr-3 h-15 transition-transform duration-300 scale-125 hover:scale-140"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-mainText-color italic">
          NawalowaConstruction
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button
          className="!bg-gray-300 text-mainTheme-color transition-transform duration-300 hover:scale-110"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {navLinks?.map((navLink) => (
          <NavbarLink
            key={navLink.linkUrl}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(navLink.linkUrl??"/");
              if (navLink.onClick) navLink.onClick();
            }}
            className={`${
              currentPath === navLink.linkUrl
                ? "!text-mainText-color scale-115 transition-transform duration-300"
                : ""
            }`}
          >
            {navLink.linkName}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavigationBar;
