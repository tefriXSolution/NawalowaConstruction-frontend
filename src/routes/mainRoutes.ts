import { 
    ServiceManagementPage, 
    HomePage, 
    AboutUsPage, 
    ContactUsPage,  
} from '@/pages'
import { RouteObject } from 'react-router';

export const mainRoutes :RouteObject[] = [
        { index: true, Component: HomePage },
        { path: "about", Component: AboutUsPage },
        { path: "contactUs", Component: ContactUsPage },
        { path: "services", Component: ServiceManagementPage },
        { path: "rentals", Component: ServiceManagementPage },
    ];  