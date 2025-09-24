import { createBrowserRouter } from "react-router-dom";
import {
    HomePage,
    AboutUsPage,
    ContactUsPage,
    SettingsPage
} from '@/pages'

import {AdminDashboardLayout} from '@/layouts/index'

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "about", Component: AboutUsPage },
  { path: "contactUs", Component: ContactUsPage },
  { path: "dashboard", Component: AdminDashboardLayout,
    children:[
        { index: true, Component: HomePage },
        { path: "settings", Component: SettingsPage },
        { path: "about", Component: AboutUsPage },
    ]
   },
]);
