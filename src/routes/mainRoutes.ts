import {
  HomePage,
  AboutUsPage,
  ContactUsPage,
  RentalItemsPage,
  ServicesPage,
  LoginPage,
} from '@/pages';
import { RouteObject } from 'react-router';

export const mainRoutes: RouteObject[] = [
  { index: true, Component: HomePage },
  { path: 'about', Component: AboutUsPage },
  { path: 'contactUs', Component: ContactUsPage },
  { path: 'services', Component: ServicesPage },
  { path: 'rentals', Component: RentalItemsPage },
  { path: 'login', Component: LoginPage },
];
