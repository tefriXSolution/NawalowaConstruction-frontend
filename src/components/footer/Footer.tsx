import Logo from "@/assets/img/logo.png";
import { FooterLink } from "@/types";

interface Props {
  footerLinks: FooterLink[];
}

export const Footer = ({ footerLinks }: Props) => {
  return (
    <footer className="shadow-sm bg-navbar-gradient">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <a
            href="/"
            className="flex items-center justify-center sm:justify-start mb-2 sm:mb-0 space-x-2 sm:space-x-3 rtl:space-x-reverse"
          >
            <img
              src={Logo}
              className="h-10 sm:h-12 md:h-14 transition-transform duration-300 scale-110 hover:scale-125"
              alt="Logo"
            />
            <span className="self-center text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap text-mainText-color italic">
              Nawalowa Constructions
            </span>
          </a>

          <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-2 text-sm sm:text-base font-medium text-gray-400">
            {footerLinks?.map((link) => (
              <li key={link.linkUrl}>
                <a
                  href={link.linkUrl}
                  className="hover:underline transition-colors duration-200 hover:text-mainText-color"
                >
                  {link.linkName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <span className="block text-xs sm:text-sm text-center text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tefrix.com/"
            className="hover:underline text-mainText-color"
          >
            Developed By TefriX Solutions
          </a>{" "}
          | All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
