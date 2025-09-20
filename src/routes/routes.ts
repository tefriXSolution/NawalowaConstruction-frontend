import { createBrowserRouter } from "react-router";
import {
    HomePage,
    AboutUsPage,
    ContactUsPage

} from '@/pages'

import {AdminDashboardLayout} from '@/layouts/index'

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "about", Component: AboutUsPage },
  { path: "contactUs", Component: ContactUsPage },
  { path: "dashboard", Component: AdminDashboardLayout,
    children:[
        { index: true, Component: HomePage },
        { path: "contact", Component: ContactUsPage },
        { path: "about", Component: AboutUsPage },
    ]
   },
]);
