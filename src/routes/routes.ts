import { createBrowserRouter } from "react-router-dom";
import {
    HomePage,
    AboutUsPage,
    ContactUsPage,
    SettingsPage,
    ProductMgtPage,
    ServiceManagementPage
} from '@/pages'

import {
  AdminDashboardLayout, 
  MainLayout
} from '@/layouts/index'

export const router = createBrowserRouter([
  // { path: "/", Component: HomePage },
  // { path: "about", Component: AboutUsPage },
  // { path: "contactUs", Component: ContactUsPage },
  // { path: "services", Component: ContactUsPage },
  // { path: "rentals", Component: ContactUsPage },
  { path: "/", Component: MainLayout,
    children:[
        { index: true, Component: HomePage },
        { path: "about", Component: AboutUsPage },
        { path: "contactUs", Component: ContactUsPage },
        { path: "services", Component: ServiceManagementPage },
        { path: "rentals", Component: ServiceManagementPage },
    ]
   },
  { path: "dashboard", Component: AdminDashboardLayout,
    children:[
        { index: true, Component: ProductMgtPage },
        { path: "settings", Component: SettingsPage },
        { path: "product-manage", Component: ProductMgtPage },
        { path: "service-manage", Component: ServiceManagementPage },
    ]
   },
]);
