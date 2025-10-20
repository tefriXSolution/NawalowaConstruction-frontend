import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "@/assets/img/logo.png";
import { navbarStyle } from "@/styles";
import { NavBarLink } from "@/types";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/types';
import { validateToken } from "@/utils";
import { useEffect, useMemo } from "react";
import { logOutUser } from "@/redux/thunks/user.thunk";
import { persistor } from "@/redux/store";

interface Props {
  navLinks: NavBarLink[];
}

const NavigationBar = ({ navLinks }: Props) => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const { user, refreshToken, token, message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useMemo(() => 
    !validateToken(refreshToken ?? "").error,
    [refreshToken]
  );

  useEffect(() => {
    import("flowbite").then(({ initFlowbite }) => initFlowbite());
  }, [isAuthenticated]);

  const handleSignOut = () => {
    dispatch(logOutUser({ email: user?.email ?? "" }));
    persistor.purge();
    navigate('/');
    window.location.reload();
  };

  const handleNavLinkClick = (navLink: NavBarLink) => {
    navigate(navLink.linkUrl ?? "/");
    if (navLink.onClick) navLink.onClick();
  };

  return (
    <Navbar
      fluid
      theme={navbarStyle}
      className="bg-navbar-gradient relative z-[1000] px-4 sm:px-6 md:px-8 lg:px-16"
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
        {!isAuthenticated ? (
          <Button
            className="hidden md:inline-block !bg-gray-300 text-mainTheme-color text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        ) : (
          <div className="flex items-center md:order-2">
            <button
              id="user-menu-button"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom-end"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            <div
              id="user-dropdown"
              className="z-50 hidden my-4 w-48 text-sm bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                  {user?.fname} {user?.lname}
                </span>
                <span className="block text-xs text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2 text-gray-700 dark:text-gray-200" aria-labelledby="user-menu-button">
                <li>
                  <button
                    onClick={()=>navigate('/dashboard')}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse className="absolute top-full left-0 w-full bg-mainTheme-color   md:bg-transparent shadow-lg md:static md:shadow-none md:w-auto">
        {navLinks.map((navLink) => (
          <NavbarLink
            key={navLink.linkUrl}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick(navLink);
            }}
            className={`block w-full text-base sm:text-lg md:text-base lg:text-lg px-4 md:px-2 lg:px-4 rounded-2xl py-2 md:py-0 text-center md:text-left transition-colors duration-200 ${
              currentPath === navLink.linkUrl
                ? "!text-mainTheme-color md:scale-110 !bg-mainText-color "
                : "hover:!bg-mainText-color hover:!text-mainTheme-color "
            }`}
          >
            {navLink.linkName}
          </NavbarLink>
        ))}

        {/* Mobile login button - only show when not authenticated */}
        {!isAuthenticated && (
          <div className="md:hidden mt-2 px-4 mb-10">
            <Button
              className="w-full !bg-gray-300 text-mainTheme-color text-base py-2 transition-transform duration-300 hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavigationBar;