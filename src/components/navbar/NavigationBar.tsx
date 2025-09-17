import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "@/assets/img/logo.png"
import { navbarStyle } from "@/styles";
import { NavBarLink } from "@/types";

interface Props {
  navLinks : NavBarLink[]
}

const NavigationBar = ({navLinks}:Props) => {
  return (
  <Navbar fluid theme={navbarStyle} className="!bg-mainTheme-color">
      <NavbarBrand href="https://flowbite-react.com">
        <img src={Logo}  className="mr-3 h-15 transition-transform duration-300 scale-125 hover:scale-140" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-mainText-color italic">NawalowaConstruction</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="!bg-gray-300 text-mainTheme-color transition-transform duration-300 hover:scale-110">
          Login
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {navLinks?.map((navLink) => (
          <NavbarLink href={navLink.linkUrl} onClick={navLink.onClick}>
            {navLink.linkName}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  )
}

export default NavigationBar