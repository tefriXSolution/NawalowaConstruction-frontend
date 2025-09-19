import { createTheme } from "flowbite-react";

export const dashboardTheme = createTheme({
  "root": {
    "base": "h-screen !w-fit",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded px-3 py-4 !bg-mainSidebar-color"
  },
  "item": {
    "base": "group flex items-center justify-center rounded-lg p-2 text-base font-normal !text-mainTheme-color hover:!bg-mainSidebar-link-hover-color hover:!text-mainSidebar-linkText-hover-color",
    "active": "bg-gray-100 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3"
    },
    "icon": {
      "base": "h-6 w-6 shrink-0 transition duration-75 g !text-mainSidebar-link-hover-color group-hover:!text-mainSidebar-linkText-hover-color",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 !text-green-50",
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
})