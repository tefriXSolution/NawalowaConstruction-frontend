import { 
    ProductMgtPage, 
    SettingsPage, 
    ServiceManagementPage,
    ManageContactsPage  
} from '@/pages'
import { RouteObject } from 'react-router';

export const dashboardRoutes :RouteObject[] = [
  { index: true, Component: ProductMgtPage },
  { path: "settings", Component: SettingsPage },
  { path: "product-manage", Component: ServiceManagementPage },
  { path: "service-manage", Component: ServiceManagementPage },
  { path: "contacts", Component: ManageContactsPage },
];  