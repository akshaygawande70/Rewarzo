import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import BrowseCourse from "./pages/dashboard/browse-courses";
import BrowseCategories from "./pages/dashboard/browse-categories";
import ExploreCourse from "./pages/dashboard/explore-course";
import ViewTutorial from "./pages/dashboard/tutorials/view-tutorial";
import ManageCategories from "./pages/dashboard/manage/categories/manage-categories";

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
        name: "Courses",
        path: "/browse-courses",
        element: <BrowseCourse />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Categories",
        path: "/browse-categories",
        element: <BrowseCategories />,
      },
      {
        icon: <BuildingLibraryIcon {...icon} />,
        name: "My Library",
        path: "/browse-my-library",
        element: <SignUp />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "My Favorites",
        path: "/browse-my-favorites",
        element: <SignUp />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "Explore Course",
        path: "/explore-course/:courseId",
        element: <ExploreCourse />,
        notOnNav: true,
      },
      ,
      {
        icon: <StarIcon {...icon} />,
        name: "View Tutorial",
        path: "/view-tutorial/:tutorialId",
        element: <ViewTutorial />,
        notOnNav: true,
      }
    ],
  },
  {
    title: "Master",
    layout: "dashboard",
    pages: [
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Manage Categories",
        path: "/admin/manage-categories",
        element: <ManageCategories />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Manage Courses",
        path: "/admin/manage-courses",
        element: <BrowseCategories />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "Manage Tutorials",
        path: "/admin/manage-tutorials",
        element: <ViewTutorial />
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
