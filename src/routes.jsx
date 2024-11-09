import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import LoyaltyTierManagement from "./pages/dashboard/manage/loyalty-tiers/manage-loyalty-tier";
import CustomerManagement from "./pages/dashboard/manage/customers/manage-customers";
import ManageOrders from "./pages/dashboard/manage/orders/manage-orders";
import NewOrderScreen from "./pages/dashboard/manage/orders/new-order";
import CategoryManagement from "./pages/dashboard/manage/categories/manage-categories";
import ProductManagement from "./pages/dashboard/manage/products/manage-products";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "Learning",
    layout: "dashboard",
    pages: [
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Loyalty Tier",
        path: "/manage-loyalty-tier",
        element: <LoyaltyTierManagement />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Customers",
        path: "/manage-customers",
        element: <CustomerManagement />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "New Order",
        path: "/new-order",
        element: <NewOrderScreen />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Orders",
        path: "/manage-orders",
        element: <ManageOrders />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Categories",
        path: "/manage-categories",
        element: <CategoryManagement />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Products",
        path: "/manage-products",
        element: <ProductManagement />,
      }
    ],
  },
  {
    title: "Master",
    layout: "dashboard",
    pages: [
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Orders",
        path: "/manage-orders",
        element: <ManageOrders />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
