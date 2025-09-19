import Logo from "@/assets/img/logo.png"
import { FooterLink } from "@/types"

interface Props{
    footerLinks:FooterLink[]
}

export const Footer = ({footerLinks}:Props) => {
  return (
    <footer className="shadow-sm bg-mainTheme-color">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-15 transition-transform duration-300 scale-125 hover:scale-150 " alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-mainText-color italic">NawalowaConstraction</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    {
                        footerLinks?.map((link)=>(
                            <li>
                                <a href={link.linkUrl} className="hover:underline me-4 md:me-6">{link.linkName}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm sm:text-center text-gray-400">© {new Date().getFullYear()} <a target="_blank" href="https://tefrix.com/" className="hover:underline">Develop By TefriX Solution</a> | All Rights Reserved.</span>
        </div>
</footer>


  )
}
